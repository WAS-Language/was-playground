import { useDebouncedCallback } from "@tanstack/react-pacer";
import { useCallback, useEffect, useRef, useState } from "react";

import init, { Compiler } from "./assets/compiler/was_compiler";
import Editor from "./components/editor";
import Footer from "./components/footer";
import Loading from "./components/loading";
import NavBar from "./components/nav-bar";

const compileProgram = (source: string) => {
  const compiler = new Compiler();

  try {
    return {
      bytes: new Uint8Array(compiler.compile(source)),
      wat: compiler.compileWat(source),
    };
  } finally {
    compiler.free();
  }
};

export default function App() {
  const [sourceCode, setSourceCode] = useState<string | undefined>();
  const [watCode, setWatCode] = useState("");

  const [wasmBytes, setWasmBytes] = useState<Uint8Array<ArrayBuffer> | null>(
    null
  );

  const [compilationTimeMs, setCompilationTimeMs] = useState<number | null>(
    null
  );

  const [executionTimeMs, setExecutionTimeMs] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const execution = useRef<Worker | null>(null);

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

  const stopExecution = useCallback(() => {
    if (execution.current) {
      execution.current.terminate();
      execution.current = null;
    }
  }, []);

  const run = () => {
    if (isRunning || !sourceCode?.trim()) {
      return;
    }

    setOutput("");
    setExecutionTimeMs(null);
    const bytes = compileSource(sourceCode);

    if (!bytes) {
      return;
    }

    setIsRunning(true);

    try {
      const worker = new Worker(
        new URL("lib/wasm-worker.ts", import.meta.url),
        {
          type: "module",
        }
      );

      const finish = (message: {
        output?: string;
        error?: string;
        executionTimeMs?: number | null;
      }) => {
        stopExecution();
        setIsRunning(false);
        setOutput(message.output ?? "");
        setErrorMessage(message.error ?? "");
        setExecutionTimeMs(message.executionTimeMs ?? null);
      };

      execution.current = worker;
      // stopExecution terminates this worker on completion and effect cleanup.
      // oxlint-disable-next-line react-doctor/effect-needs-cleanup
      worker.addEventListener(
        "message",
        (
          event: MessageEvent<{
            output?: string;
            error?: string;
            executionTimeMs?: number | null;
          }>
        ) => {
          finish(event.data);
        }
      );

      worker.addEventListener("error", (event) => {
        event.preventDefault();
        finish({
          error: event.message || "Failed to execute the WASM program.",
        });
      });

      // Worker messaging has no targetOrigin parameter.
      // oxlint-disable-next-line unicorn/require-post-message-target-origin
      worker.postMessage(bytes);
    } catch (error) {
      stopExecution();
      setIsRunning(false);
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      try {
        await init();

        if (active) {
          setIsLoading(false);
        }
      } catch (error) {
        if (active) {
          setErrorMessage(
            error instanceof Error ? error.message : String(error)
          );
          setIsLoading(false);
        }
      }
    };

    initialize();

    return () => {
      active = false;
      stopExecution();
    };
  }, [stopExecution]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex h-screen flex-col">
      <NavBar
        className="flex-none"
        onRun={run}
        isRunning={isRunning}
        canRun={!!sourceCode?.trim()}
      />
      <div className="flex min-h-0 flex-1 flex-row justify-between gap-2">
        <Editor
          className="flex-1"
          sourceCode={sourceCode}
          onChange={(value) => {
            setSourceCode(value);
            compile(value ?? "");
          }}
        />
        <Editor sourceCode={watCode} readOnly className="flex-1" />
      </div>
      <section
        className="bg-base-200 flex-none p-4"
        aria-label="Program output"
      >
        <h2 className="text-sm font-semibold">Output</h2>
        {errorMessage ? (
          <pre role="alert" className="text-error whitespace-pre-wrap">
            {errorMessage}
          </pre>
        ) : (
          <output className="block whitespace-pre-wrap">
            {isRunning
              ? "Running..."
              : output || "Click Run to execute main()."}
          </output>
        )}
      </section>
      <Footer
        compilationTimeMs={compilationTimeMs ?? 0}
        executionTimeMs={executionTimeMs ?? 0}
        sizeBytes={wasmBytes?.byteLength ?? 0}
      />
    </main>
  );
}
