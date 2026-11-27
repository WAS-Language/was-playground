import { IconCirclePlay } from "@tabler/icons-react";
import { cn } from "cn";

import ExampleSelector from "./example-selector";

interface NavBarProps {
  className?: string;
  onRun: () => void;
  onExampleSelected: (example: string) => void;
  isRunning: boolean;
  canRun: boolean;
  level: number;
  updateLevel: (level: number) => void;
  useBinaryen: boolean;
  updateBinaryen: (enabled: boolean) => void;
  wasmBytes: Uint8Array<ArrayBuffer> | null;
}

function NavBar({
  className,
  onRun,
  onExampleSelected,
  isRunning,
  canRun,
  level,
  updateLevel,
  useBinaryen,
  updateBinaryen,
  wasmBytes,
}: NavBarProps) {
  const downloadWasm = () => {
    if (!wasmBytes?.byteLength) {
      return;
    }

    const blob = new Blob([wasmBytes], { type: "application/wasm" });
    const url = URL.createObjectURL(blob);
    setTimeout(() => URL.revokeObjectURL(url), 0);

    const link = document.createElement("a");
    link.href = url;
    link.download = "program.wasm";
    link.click();
  };

  return (
    <div className={cn("navbar shadow-sm", className)}>
      <div className="flex-1">
        <span>WAS Playground</span>
      </div>
      <div className="flex flex-none flex-row items-center gap-2">
        <ExampleSelector onSelect={onExampleSelected} />
        <select
          aria-label="Optimization level"
          className="select w-auto"
          value={level}
          onChange={(event) => updateLevel(Number(event.currentTarget.value))}
        >
          <option value={0}>O0 — None</option>
          <option value={1}>O1 — Basic</option>
          <option value={2}>O2 — Standard</option>
          <option value={3}>O3 — Aggressive</option>
        </select>
        <label className="label">
          <input
            type="checkbox"
            className="checkbox"
            checked={useBinaryen}
            disabled={level === 0}
            onChange={(event) => updateBinaryen(event.currentTarget.checked)}
          />
          Binaryen (O1–O3)
        </label>
        <button
          type="button"
          className="btn"
          disabled={!wasmBytes?.byteLength}
          onClick={downloadWasm}
        >
          Download WASM
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onRun}
          disabled={!canRun || isRunning}
        >
          <IconCirclePlay />
          {isRunning ? "Running..." : "Run"}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
