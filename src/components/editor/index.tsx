import { Editor as MonacoEditor } from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { EditorLoading } from "../loading";
import { wasTheme } from "./theme";

interface EditorProps {
  sourceCode?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
}

export default function Editor({
  sourceCode,
  onChange,
  className,
}: EditorProps) {
  editor.defineTheme("was", wasTheme);

  return (
    <MonacoEditor
      className={className}
      value={sourceCode}
      onChange={onChange}
      loading={<EditorLoading />}
      theme="was"
    />
  );
}
