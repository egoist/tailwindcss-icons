/** @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
export default {
  semi: false,
  overrides: [
    {
      files: "pnpm-lock.yaml",
      options: {
        requirePragma: true,
      },
    },
  ],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[.]",
    "",
    "<TYPES>",
  ],
}
