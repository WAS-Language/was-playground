import guardUrl from "../assets/binaryen/was_compiler_bg.wasm?url";

export async function postProcess(
  input: Uint8Array<ArrayBuffer>,
  level: number
) {
  try {
    const [{ default: binaryen }, guard] = await Promise.all([
      import("binaryen"),
      import("../assets/binaryen/was_compiler.js"),
    ]);

    await guard.default({ module_or_path: guardUrl });

    const module = binaryen.readBinary(input);

    try {
      // Binaryen expects a bitmask of enabled features.
      // oxlint-disable-next-line eslint/no-bitwise
      module.setFeatures(binaryen.Features.MVP | binaryen.Features.Multivalue);
      binaryen.setOptimizeLevel(level);
      binaryen.setShrinkLevel(0);
      binaryen.setDebugInfo(false);

      if (!module.validate()) {
        throw new Error("Binaryen rejected the compiler output.");
      }

      module.runPasses(["optimize-instructions"]);

      if (!module.validate()) {
        throw new Error("Binaryen produced an invalid module.");
      }

      const bytes = new Uint8Array(module.emitBinary());
      const wat = guard.checkBinaryenOutput(input, bytes, true);

      if (wat === undefined) {
        throw new Error("The Binaryen guard did not return WAT.");
      }

      return { bytes, wat };
    } finally {
      module.dispose();
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Binaryen post-processing failed. Uncheck Binaryen to retry.\n${reason}`,
      { cause: error }
    );
  }
}
