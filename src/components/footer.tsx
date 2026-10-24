import prettyBytes from "pretty-bytes";

interface FooterProps {
  compilationTimeMs: number;
  executionTimeMs: number;
  sizeBytes: number;
}

export default function Footer({ compilationTimeMs, executionTimeMs, sizeBytes }: FooterProps) {
  const prettySizeBytes = prettyBytes(sizeBytes);

  return (
    <footer className="footer p-4 flex flex-row bg-base-300 text-sm uppercase ">
      <aside>Compilation time: {compilationTimeMs}ms</aside>
      <aside>Execution time: {executionTimeMs}ms</aside>
      <aside>Target: WASM</aside>
      <aside>Size: {prettySizeBytes}</aside>
    </footer>
  );
}
