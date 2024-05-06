import process from "node:process"
import ts from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

const files = ["src/**/*.ts"]
const languageOptions = {
  parser: tsParser,
  parserOptions: {
    project: true,
    tsconfigRootDir: process.cwd(),
  },
}
const linterOptions = {
  reportUnusedDisableDirectives: true,
}
const plugins = {
  "@typescript-eslint": ts,
}

export default [
  // don't lint js files
  {
    ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"],
  },
  {
    files,
    languageOptions,
    linterOptions,
    plugins,
    rules: {
      ...ts.configs["eslint-recommended"].overrides[0].rules,
      ...ts.configs["recommended"].rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-non-null-assertion": "off",

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",

      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
]
