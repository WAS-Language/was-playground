import Editor from "./components/editor";
import Footer from "./components/footer";
import NavBar from "./components/nav-bar";
import { useCompiler } from "./hooks";

export default function App() {
  const {
    compilationTimeMs,
    executionTimeMs,
    errorMessage,
    sourceCode,
    updateCode,
    wasmBytes,
    watCode,
    level,
    updateLevel,
    useBinaryen,
    updateBinaryen,
    run,
    isRunning,
    output,
  } = useCompiler();

  return (
    <main className="flex h-screen flex-col">
      <NavBar
        className="flex-none"
        onRun={run}
        isRunning={isRunning}
        canRun={!!sourceCode?.trim()}
        onExampleSelected={updateCode}
        level={level}
        updateLevel={updateLevel}
        useBinaryen={useBinaryen}
        updateBinaryen={updateBinaryen}
        wasmBytes={wasmBytes}
      />
      <div className="flex min-h-0 flex-1 flex-row justify-between gap-2">
        <Editor
          className="flex-1"
          sourceCode={sourceCode}
          onChange={updateCode}
        />
        <Editor sourceCode={watCode} readOnly className="flex-1" />
      </div>
      <section
        className="bg-base-200 flex-none p-4"
        aria-label="Program output"
      >
        <h2 className="text-sm font-semibold">Output</h2>
        {errorMessage ? (
          <pre role="alert" className="text-error whitespace-pre-wrap">
            {errorMessage}
          </pre>
        ) : (
          <output className="block whitespace-pre-wrap">
            {isRunning
              ? "Running..."
              : output || "Click Run to execute main()."}
          </output>
        )}
      </section>
      <Footer
        compilationTimeMs={compilationTimeMs ?? 0}
        executionTimeMs={executionTimeMs ?? 0}
        sizeBytes={wasmBytes?.byteLength ?? 0}
      />
    </main>
  );
}
