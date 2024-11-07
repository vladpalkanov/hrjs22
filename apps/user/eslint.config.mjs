import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,cjs,mjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: [
      "node_modules/*",
        "./node_modules"
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
