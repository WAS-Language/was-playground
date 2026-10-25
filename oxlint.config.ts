import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import { jsPluginSettings, selectJsPlugins } from "ultracite/oxlint/js-plugins";
import react from "ultracite/oxlint/react";
import vitest from "ultracite/oxlint/vitest";

const jsPlugins = selectJsPlugins(["react-doctor"]);

export default defineConfig({
  env: core.env,
  extends: [core, react, vitest, antiSlop, jsPlugins],
  ignorePatterns: [...(core.ignorePatterns ?? []), "src/assets/compiler/**"],
  jsPlugins: jsPlugins.jsPlugins,
  plugins: ["react", "typescript", "oxc"],
  rules: {
    "eslint/func-style": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "function-expression",
      },
    ],
    "react/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
      },
    ],
    "react/rules-of-hooks": "error",
  },
  settings: jsPluginSettings,
});
