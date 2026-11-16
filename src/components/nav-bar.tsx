import { IconCirclePlay } from "@tabler/icons-react";
import { cn } from "cn";

import ExampleSelector from "./example-selector";

interface NavBarProps {
  className?: string;
  onRun: () => void;
  onExampleSelected: (example: string) => void;
  isRunning: boolean;
  canRun: boolean;
}

function NavBar({
  className,
  onRun,
  onExampleSelected,
  isRunning,
  canRun,
}: NavBarProps) {
  return (
    <div className={cn("navbar shadow-sm", className)}>
      <div className="flex-1">
        <span>WAS Playground</span>
      </div>
      <div className="flex flex-none flex-row items-center gap-2">
        <ExampleSelector onSelect={onExampleSelected} />
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
