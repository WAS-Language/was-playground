/* tslint:disable */
/* eslint-disable */

export class Compiler {
    free(): void;
    [Symbol.dispose](): void;
    compileWat(source: string): string;
    compile(source: string): Uint8Array;
    exportAll(): void;
    exportNone(): void;
    constructor();
    registerHostFunction(name: string, module: string, field: string, params: string[], result: string): void;
    setExports(names: string[]): void;
    setOptimizationLevel(level: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_compiler_free: (a: number, b: number) => void;
    readonly compiler_compile: (a: number, b: number, c: number) => [number, number, number, number];
    readonly compiler_compileWat: (a: number, b: number, c: number) => [number, number, number, number];
    readonly compiler_exportAll: (a: number) => void;
    readonly compiler_exportNone: (a: number) => void;
    readonly compiler_new: () => number;
    readonly compiler_registerHostFunction: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: any, i: number, j: number) => [number, number];
    readonly compiler_setExports: (a: number, b: any) => [number, number];
    readonly compiler_setOptimizationLevel: (a: number, b: number) => [number, number];
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
