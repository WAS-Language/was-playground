# WAS Playground

## Optional Binaryen post-processing

The **Binaryen (O1–O3)** checkbox is off by default. When enabled at O1–O3, the worker uses the pinned `binaryen@116.0.0` to run only `optimize-instructions` with MVP + multi-value. The separate guard validates the output before it is displayed, executed, or made available for download. If post-processing fails, no unoptimized fallback is published; uncheck Binaryen to retry. O0 never loads the optional assets.

To refresh the guard, run this from the `was-compiler` root:

```sh
wasm-pack build crates/browser \
  --target web \
  --out-dir ../../target/playground-binaryen-guard \
  --out-name was_compiler \
  --mode no-install --no-opt --offline \
  --features playground-binaryen
```

Copy `was_compiler.js`, `was_compiler.d.ts`, `was_compiler_bg.wasm`, and `was_compiler_bg.wasm.d.ts` from that output into `src/assets/binaryen/`. Leave the primary package in `src/assets/compiler/` unchanged.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances. You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
