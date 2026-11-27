import { useCallback, useEffect, useRef, useState } from "react";

import type { CompileRequest, WorkerReply } from "../lib/types";

const PREVIEW_DELAY_MS = 500;
const REQUEST_TIMEOUT_MS = 5000;
const BASIC_LEVEL = 1;

interface Job {
  timer?: number;
  worker?: Worker;
}

export function useCompiler() {
  const [sourceCode, setSourceCode] = useState("");
  const [level, setLevel] = useState(BASIC_LEVEL);
  const [useBinaryen, setUseBinaryen] = useState(false);

  const [artifact, setArtifact] = useState<Extract<
    WorkerReply,
    { kind: "compiled" }
  > | null>(null);

  const [execution, setExecution] = useState<Extract<
    WorkerReply,
    { kind: "executed" }
  > | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const active = useRef<Job | null>(null);

  const cancel = useCallback(() => {
    const job = active.current;
    active.current = null;
    window.clearTimeout(job?.timer);
    job?.worker?.terminate();
  }, []);

  useEffect(() => cancel, [cancel]);

  function request(snapshot: CompileRequest) {
    cancel();
    setArtifact(null);
    setExecution(null);
    setErrorMessage("");
    setIsRunning(snapshot.run);

    if (!snapshot.source.trim()) {
      return;
    }

    const job: Job = {};
    active.current = job;

    function finish(error = "") {
      if (active.current !== job) {
        return;
      }

      cancel();
      setIsRunning(false);
      setErrorMessage(error);
    }

    function start() {
      if (active.current !== job) {
        return;
      }

      try {
        const worker = new Worker(
          new URL("../lib/wasm-worker.ts", import.meta.url),
          { type: "module" }
        );

        job.worker = worker;
        job.timer = window.setTimeout(
          () => finish("Request timed out after 5 seconds."),
          REQUEST_TIMEOUT_MS
        );
        worker.addEventListener(
          "message",
          ({ data }: MessageEvent<WorkerReply>) => {
            if (active.current !== job) {
              return;
            }

            if (data.kind === "compiled") {
              setArtifact(data);

              if (!snapshot.run) {
                finish();
              }
            } else if (data.kind === "executed") {
              setExecution(data);
              finish();
            } else {
              finish(data.error);
            }
          }
        );

        worker.addEventListener("error", (event) =>
          finish(event.message || "Compiler worker failed.")
        );
        // Worker messaging has no targetOrigin parameter.
        // oxlint-disable-next-line unicorn/require-post-message-target-origin
        worker.postMessage(snapshot);
      } catch (error) {
        finish(error instanceof Error ? error.message : String(error));
      }
    }

    if (snapshot.run) {
      start();
    } else {
      job.timer = window.setTimeout(start, PREVIEW_DELAY_MS);
    }
  }

  function updateCode(source = "") {
    setSourceCode(source);
    request({ level, run: false, source, useBinaryen });
  }

  function updateLevel(value: number) {
    setLevel(value);
    request({ level: value, run: false, source: sourceCode, useBinaryen });
  }

  function updateBinaryen(enabled: boolean) {
    setUseBinaryen(enabled);
    request({ level, run: false, source: sourceCode, useBinaryen: enabled });
  }

  return {
    compilationTimeMs: artifact?.compilationTimeMs,
    errorMessage,
    executionTimeMs: execution?.executionTimeMs,
    isRunning,
    level,
    output: execution?.output,
    run: () => request({ level, run: true, source: sourceCode, useBinaryen }),
    sourceCode,
    updateBinaryen,
    updateCode,
    updateLevel,
    useBinaryen,
    wasmBytes: artifact?.bytes ?? null,
    watCode: artifact?.wat ?? "",
  };
}
