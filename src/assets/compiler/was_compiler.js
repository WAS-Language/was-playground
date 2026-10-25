/* @ts-self-types="./was_compiler.d.ts" */

export class Compiler {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CompilerFinalization.unregister(this);

    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_compiler_free(ptr, 0);
  }
  /**
   * @param {string} source
   * @returns {string}
   */
  compileWat(source) {
    let deferred3_0;
    let deferred3_1;

    try {
      const ptr0 = passStringToWasm0(
        source,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      );

      const len0 = WASM_VECTOR_LEN;
      const ret = wasm.compiler_compileWat(this.__wbg_ptr, ptr0, len0);
      let ptr2 = ret[0];
      let len2 = ret[1];

      if (ret[3]) {
        ptr2 = 0;
        len2 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }

      deferred3_0 = ptr2;
      deferred3_1 = len2;

      return getStringFromWasm0(ptr2, len2);
    } finally {
      wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
  }
  /**
   * @param {string} source
   * @returns {Uint8Array}
   */
  compile(source) {
    const ptr0 = passStringToWasm0(
      source,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );

    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.compiler_compile(this.__wbg_ptr, ptr0, len0);

    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }

    const v2 = [...getArrayU8FromWasm0(ret[0], ret[1])];
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);

    return v2;
  }
  exportAll() {
    wasm.compiler_exportAll(this.__wbg_ptr);
  }
  exportNone() {
    wasm.compiler_exportNone(this.__wbg_ptr);
  }
  constructor() {
    const ret = wasm.compiler_new();
    this.__wbg_ptr = ret;
    CompilerFinalization.register(this, this.__wbg_ptr, this);

    return this;
  }
  /**
   * @param {string} name
   * @param {string} module
   * @param {string} field
   * @param {string[]} params
   * @param {string} result
   */
  registerHostFunction(name, module, field, params, result) {
    const ptr0 = passStringToWasm0(
      name,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );

    const len0 = WASM_VECTOR_LEN;

    const ptr1 = passStringToWasm0(
      module,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );

    const len1 = WASM_VECTOR_LEN;

    const ptr2 = passStringToWasm0(
      field,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );

    const len2 = WASM_VECTOR_LEN;

    const ptr3 = passStringToWasm0(
      result,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );

    const len3 = WASM_VECTOR_LEN;

    const ret = wasm.compiler_registerHostFunction(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1,
      ptr2,
      len2,
      params,
      ptr3,
      len3
    );

    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {string[]} names
   */
  setExports(names) {
    const ret = wasm.compiler_setExports(this.__wbg_ptr, names);

    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {number} level
   */
  setOptimizationLevel(level) {
    const ret = wasm.compiler_setOptimizationLevel(this.__wbg_ptr, level);

    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
}

if (Symbol.dispose) {
  Compiler.prototype[Symbol.dispose] = Compiler.prototype.free;
}

function __wbg_get_imports() {
  const import0 = {
    __proto__: null,
    __wbg___wbindgen_string_get_0380ccaa2f57f0d9(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "string" ? obj : undefined;

      const ptr1 = isLikeNone(ret)
        ? 0
        : passStringToWasm0(
            ret,
            wasm.__wbindgen_malloc,
            wasm.__wbindgen_realloc
          );

      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_throw_41e9ee4f547fc59a(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbg_get_unchecked_288889d017702237(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];

      return ret;
    },
    __wbg_isArray_e15a2ff68ffdbef2(arg0) {
      const ret = Array.isArray(arg0);

      return ret;
    },
    __wbg_length_d4bdea10311bd9cf(arg0) {
      const ret = arg0.length;

      return ret;
    },
    __wbg_new_343a093a3c2ffb4e(arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));

      return ret;
    },
    __wbindgen_init_externref_table() {
      const table = wasm.__wbindgen_externrefs;
      const offset = table.grow(4);
      table.set(0, undefined);
      table.set(offset + 0, undefined);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    },
  };

  return {
    "./was_compiler_bg.js": import0,
    __proto__: null,
  };
}

const CompilerFinalization =
  typeof FinalizationRegistry === "undefined"
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) => wasm.__wbg_compiler_free(ptr, 1));

function getArrayU8FromWasm0(ptr, len) {
  ptr >>>= 0;

  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
  if (
    cachedDataViewMemory0 === null ||
    cachedDataViewMemory0.buffer.detached === true ||
    (cachedDataViewMemory0.buffer.detached === undefined &&
      cachedDataViewMemory0.buffer !== wasm.memory.buffer)
  ) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }

  return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
  return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
  if (
    cachedUint8ArrayMemory0 === null ||
    cachedUint8ArrayMemory0.byteLength === 0
  ) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;

    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8ArrayMemory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);

    if (code > 0x7f) {
      break;
    }

    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }

    ptr = realloc(ptr, len, (len = offset + arg.length * 3), 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }

  WASM_VECTOR_LEN = offset;

  return ptr;
}

function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_externrefs.get(idx);
  wasm.__externref_table_dealloc(idx);

  return value;
}

let cachedTextDecoder = new TextDecoder("utf-8", {
  fatal: true,
  ignoreBOM: true,
});

cachedTextDecoder.decode();

const MAX_SAFARI_DECODE_BYTES = 2_146_435_072;
let numBytesDecoded = 0;

function decodeText(ptr, len) {
  numBytesDecoded += len;

  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", {
      fatal: true,
      ignoreBOM: true,
    });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }

  return cachedTextDecoder.decode(
    getUint8ArrayMemory0().subarray(ptr, ptr + len)
  );
}

const cachedTextEncoder = new TextEncoder();

if (!("encodeInto" in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function encodeInto(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);

    return {
      read: arg.length,
      written: buf.length,
    };
  };
}

let WASM_VECTOR_LEN = 0;

let wasm;
let wasmInstance;
let wasmModule;

function __wbg_finalize_init(instance, module) {
  wasmInstance = instance;
  wasm = instance.exports;
  wasmModule = module;
  cachedDataViewMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  wasm.__wbindgen_start();

  return wasm;
}

async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (!module.ok) {
      throw new Error(
        `failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`
      );
    }

    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (error) {
        const validResponse = expectedResponseType(module.type);

        if (
          validResponse &&
          module.headers.get("Content-Type") !== "application/wasm"
        ) {
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            error
          );
        } else {
          throw error;
        }
      }
    }

    const bytes = await module.arrayBuffer();

    return await WebAssembly.instantiate(bytes, imports);
  }

  const instance = await WebAssembly.instantiate(module, imports);

  if (instance instanceof WebAssembly.Instance) {
    return { instance, module };
  }

  return instance;

  function expectedResponseType(type) {
    switch (type) {
      case "basic":
      case "cors":
      case "default": {
        return true;
      }
    }

    return false;
  }
}

function initSync(module) {
  if (wasm !== undefined) {
    return wasm;
  }

  if (module !== undefined) {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module } = module);
    } else {
      console.warn(
        "using deprecated parameters for `initSync()`; pass a single object instead"
      );
    }
  }

  const imports = __wbg_get_imports();

  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }

  const instance = new WebAssembly.Instance(module, imports);

  return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
  if (wasm !== undefined) {
    return wasm;
  }

  if (module_or_path !== undefined) {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn(
        "using deprecated parameters for the initialization function; pass a single object instead"
      );
    }
  }

  if (module_or_path === undefined) {
    module_or_path = new URL("was_compiler_bg.wasm", import.meta.url);
  }

  const imports = __wbg_get_imports();

  if (
    typeof module_or_path === "string" ||
    (typeof Request === "function" && module_or_path instanceof Request) ||
    (typeof URL === "function" && module_or_path instanceof URL)
  ) {
    module_or_path = fetch(module_or_path);
  }

  const { instance, module } = await __wbg_load(await module_or_path, imports);

  return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
