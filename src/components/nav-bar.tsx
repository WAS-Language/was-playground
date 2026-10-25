import { IconCirclePlay } from "@tabler/icons-react";
import { cn } from "cn";

interface NavBarProps {
  className?: string;
  onRun: () => void;
  isRunning: boolean;
  canRun: boolean;
}

export default function NavBar({
  className,
  onRun,
  isRunning,
  canRun,
}: NavBarProps) {
  return (
    <div className={cn("navbar shadow-sm", className)}>
      <div className="flex-1">
        <span>WAS Playground</span>
      </div>
      <div className="flex-none">
        <button
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
