import { useDebouncedCallback } from "@tanstack/react-pacer";
import { useState } from "react";

import { Compiler } from "../assets/compiler/was_compiler";

function compileProgram(source: string) {
  const compiler = new Compiler();
  compiler.setExports(["main"]);

  try {
    return {
      bytes: new Uint8Array(compiler.compile(source)),
      wat: compiler.compileWat(source),
    };
  } finally {
    compiler.free();
  }
}

export function useCompiler() {
  const [sourceCode, setSourceCode] = useState<string | undefined>();
  const [watCode, setWatCode] = useState("");

  const [wasmBytes, setWasmBytes] = useState<Uint8Array<ArrayBuffer> | null>(
    null
  );

  const [compilationTimeMs, setCompilationTimeMs] = useState<number | null>(
    null
  );

  const [errorMessage, setErrorMessage] = useState("");

  const compileSource = (source: string) => {
    const start = performance.now();
    let compiledBytes: Uint8Array<ArrayBuffer> | null = null;

    try {
      const { wat, bytes } = compileProgram(source);

      setWatCode(wat);
      setWasmBytes(bytes);
      setErrorMessage("");
      compiledBytes = bytes;
    } catch (error) {
      setWatCode("");
      setWasmBytes(null);
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }

    setCompilationTimeMs(performance.now() - start);

    return compiledBytes;
  };

  const compile = useDebouncedCallback(compileSource, { wait: 500 });

  const updateCode = (value: string | undefined) => {
    setSourceCode(value);
    compile(value ?? "");
  };

  return {
    compilationTimeMs,
    compileSource,
    errorMessage,
    setErrorMessage,
    sourceCode,
    updateCode,
    wasmBytes,
    watCode,
  };
}
