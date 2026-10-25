self.addEventListener(
  "message",
  async (event: MessageEvent<Uint8Array<ArrayBuffer>>) => {
    let start: number | null = null;

    try {
      const { instance } = await WebAssembly.instantiate(event.data, {});
      const { main } = instance.exports;

      // The WASM export is an external boundary: verify it is callable before execution.
      // oxlint-disable-next-line anti-slop/no-runtime-typeof
      if (typeof main !== "function") {
        throw new TypeError('The program must export a "main" function.');
      }

      start = performance.now();
      const result = main();
      const executionTimeMs = performance.now() - start;
      // Worker messaging has no targetOrigin parameter.
      /* oxlint-disable unicorn/require-post-message-target-origin */
      self.postMessage({
        executionTimeMs,
        output: result === undefined ? "Program finished." : String(result),
      });
      /* oxlint-enable unicorn/require-post-message-target-origin */
    } catch (error) {
      // Worker messaging has no targetOrigin parameter.
      /* oxlint-disable unicorn/require-post-message-target-origin */
      self.postMessage({
        error: error instanceof Error ? error.message : String(error),
        executionTimeMs: start === null ? null : performance.now() - start,
      });
      /* oxlint-enable unicorn/require-post-message-target-origin */
    }
  }
);
