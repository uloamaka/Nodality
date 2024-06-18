import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: globals.browser,
    },
  },
  {
    plugins: {
      "@typescript-eslint": pluginTs,
    },
  },
  {
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginTs.configs.recommended.rules,
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
  { ignores: ["dist/", "node_modules/*"] },
];
