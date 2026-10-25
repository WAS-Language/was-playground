import { cn } from "cn";

export default function Loading() {
  return (
    <div className="flex flex-col h-screen">
      <div className="skeleton w-full h-16" />
      <div className="flex flex-row justify-between flex-1 p-2 gap-2">
        <EditorLoading />
        <EditorLoading />
      </div>
      <div className="skeleton w-full h-32" />
    </div>
  )
}

interface EditorLoadingProps {
  className?: string;
}

export function EditorLoading({ className }: EditorLoadingProps) {
  return <div className={cn("flex-1 skeleton", className)} />
}
