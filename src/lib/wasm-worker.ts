self.onmessage = async (event: MessageEvent<Uint8Array<ArrayBuffer>>) => {
  let start: number | null = null;

  try {
    const { instance } = await WebAssembly.instantiate(event.data, {});
    const { main } = instance.exports;

    if (typeof main !== "function") {
      throw new TypeError('The program must export a "main" function.');
    }

    start = performance.now();
    const result = main();
    const executionTimeMs = performance.now() - start;
    self.postMessage({
      executionTimeMs,
      output: result === undefined ? "Program finished." : String(result),
    });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
      executionTimeMs: start === null ? null : performance.now() - start,
    });
  }
};
