import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    "src/assets/compiler/**",
    "src/assets/binaryen/**",
    "*.{md}",
  ],
});
