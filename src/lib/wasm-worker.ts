import init, { Compiler } from "../assets/compiler/was_compiler";
import compilerUrl from "../assets/compiler/was_compiler_bg.wasm?url";
import { postProcess } from "./binaryen-post-process";
import type { CompileRequest, WorkerReply } from "./types";

function reply(message: WorkerReply) {
  // Worker messaging has no targetOrigin parameter.
  // oxlint-disable-next-line unicorn/require-post-message-target-origin
  self.postMessage(message);
}

function compile(
  { source, level }: CompileRequest,
  usePostProcessing: boolean
) {
  const compiler = new Compiler();

  try {
    compiler.setExports(["main"]);
    compiler.setOptimizationLevel(level);
    const bytes = new Uint8Array(compiler.compile(source));
    const wat = usePostProcessing ? "" : compiler.compileWat(source);

    return { bytes, wat };
  } finally {
    compiler.free();
  }
}

async function execute(bytes: Uint8Array<ArrayBuffer>) {
  const { instance } = await WebAssembly.instantiate(bytes);
  const { main } = instance.exports;

  // WASM exports and return values are external to TypeScript.
  // oxlint-disable-next-line anti-slop/no-runtime-typeof
  if (typeof main !== "function") {
    throw new TypeError('The program must export a "main" function.');
  }

  const start = performance.now();
  const result: unknown = main();
  const executionTimeMs = performance.now() - start;

  // oxlint-disable-next-line anti-slop/no-runtime-typeof
  const isScalar = typeof result === "number" || typeof result === "bigint";

  if (result !== undefined && !isScalar) {
    throw new TypeError('The "main" function must return a scalar or nothing.');
  }

  reply({
    executionTimeMs,
    kind: "executed",
    output: result === undefined ? "Program finished." : String(result),
  });
}

self.addEventListener(
  "message",
  async ({ data }: MessageEvent<CompileRequest>) => {
    try {
      await init({ module_or_path: compilerUrl });
      const start = performance.now();

      const usePostProcessing =
        data.useBinaryen && data.level >= 1 && data.level <= 3;

      const raw = compile(data, usePostProcessing);

      const compiled = usePostProcessing
        ? await postProcess(raw.bytes, data.level)
        : raw;

      reply({
        kind: "compiled",
        ...compiled,
        compilationTimeMs: performance.now() - start,
      });

      if (data.run) {
        await execute(compiled.bytes);
      }
    } catch (error) {
      reply({
        error: error instanceof Error ? error.message : String(error),
        kind: "error",
      });
    }
  }
);
