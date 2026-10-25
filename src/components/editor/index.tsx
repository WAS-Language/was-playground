import { lazy, Suspense } from "react";

import { EditorLoading } from "../loading";
import { wasTheme } from "./theme";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

interface EditorProps {
  sourceCode?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
  readOnly?: boolean;
}

function Editor({ sourceCode, onChange, className, readOnly }: EditorProps) {
  return (
    <Suspense fallback={<EditorLoading />}>
      <MonacoEditor
        beforeMount={(monaco) => monaco.editor.defineTheme("was", wasTheme)}
        className={className}
        options={{
          minimap: {
            enabled: false,
          },
          readOnly,
        }}
        value={sourceCode}
        onChange={onChange}
        loading={<EditorLoading />}
        theme="was"
      />
    </Suspense>
  );
}

export default Editor;
