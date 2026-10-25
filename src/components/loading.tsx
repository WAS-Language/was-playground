import { cn } from "cn";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col">
      <div className="skeleton h-16 w-full" />
      <div className="flex flex-1 flex-row justify-between gap-2 p-2">
        <EditorLoading />
        <EditorLoading />
      </div>
      <div className="skeleton h-32 w-full" />
    </div>
  );
}

interface EditorLoadingProps {
  className?: string;
}

export function EditorLoading({ className }: EditorLoadingProps) {
  return <div className={cn("skeleton flex-1", className)} />;
}
