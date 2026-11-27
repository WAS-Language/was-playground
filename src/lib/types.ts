export interface Example {
  name: string;
  code: string;
}

export interface CompileRequest {
  source: string;
  level: number;
  run: boolean;
  useBinaryen: boolean;
}

export type WorkerReply =
  | {
      kind: "compiled";
      bytes: Uint8Array<ArrayBuffer>;
      wat: string;
      compilationTimeMs: number;
    }
  | { kind: "executed"; output: string; executionTimeMs: number }
  | { kind: "error"; error: string };
