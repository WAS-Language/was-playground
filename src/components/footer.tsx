import prettyBytes from "pretty-bytes";

interface FooterProps {
  compilationTimeMs: number;
  executionTimeMs: number;
  sizeBytes: number;
}

function Footer({
  compilationTimeMs,
  executionTimeMs,
  sizeBytes,
}: FooterProps) {
  const prettySizeBytes = prettyBytes(sizeBytes);

  return (
    <footer className="footer bg-base-300 flex flex-row p-4 text-sm uppercase">
      <aside>Compilation time: {compilationTimeMs}ms</aside>
      <aside>Execution time: {executionTimeMs}ms</aside>
      <aside>Target: WASM</aside>
      <aside>Size: {prettySizeBytes}</aside>
    </footer>
  );
}

export default Footer;
