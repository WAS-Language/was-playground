import { useDebouncedCallback } from "@tanstack/react-pacer";
import { useEffect, useRef, useState } from "react";

import init, { Compiler } from "./assets/compiler/was_compiler";
import Editor from "./components/editor";
import Footer from "./components/footer";
import Loading from "./components/loading";
import NavBar from "./components/nav-bar";

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
  const [error, setError] = useState("");
  const execution = useRef<Worker | null>(null);

  function compileSource(source: string) {
    const start = performance.now();
    const compiler = new Compiler();

    try {
      const wat = compiler.compileWat(source);
      const bytes = [...compiler.compile(source)];

      setWatCode(wat);
      setWasmBytes(bytes);
      setError("");

      return bytes;
    } catch (error) {
      setWatCode("");
      setWasmBytes(null);
      setError(error instanceof Error ? error.message : String(error));

      return null;
    } finally {
      compiler.free();
      setCompilationTimeMs(performance.now() - start);
    }
  }

  const compile = useDebouncedCallback(compileSource, { wait: 500 });

  function stopExecution() {
    if (execution.current) {
      execution.current.terminate();
      execution.current = null;
    }
  }

  function run() {
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
        setError(message.error ?? "");
        setExecutionTimeMs(message.executionTimeMs ?? null);
      };

      execution.current = worker;
      worker.onmessage = (
        event: MessageEvent<{
          output?: string;
          error?: string;
          executionTimeMs?: number | null;
        }>
      ) => {
        finish(event.data);
      };

      worker.onerror = (event) => {
        event.preventDefault();
        finish({
          error: event.message || "Failed to execute the WASM program.",
        });
      };

      worker.postMessage(bytes);
    } catch (error) {
      stopExecution();
      setIsRunning(false);
      setError(error instanceof Error ? error.message : String(error));
    }
  }

  useEffect(() => {
    let active = true;
    init()
      .then(() => {
        if (active) {
          setIsLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setError(error instanceof Error ? error.message : String(error));
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
      stopExecution();
    };
  }, []);

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
        <Editor sourceCode={watCode} className="flex-1" />
      </div>
      <section
        className="bg-base-200 flex-none p-4"
        aria-label="Program output"
      >
        <h2 className="text-sm font-semibold">Output</h2>
        {error ? (
          <pre role="alert" className="text-error whitespace-pre-wrap">
            {error}
          </pre>
        ) : (
          <pre role="status" className="whitespace-pre-wrap">
            {isRunning
              ? "Running..."
              : output || "Click Run to execute main()."}
          </pre>
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
