// @ts-check
import { createRequire } from "module"
import fs from "fs"

const req = createRequire(import.meta.url)
const collections = req("@iconify/json/collections.json")

fs.writeFileSync(
  "types.ts",
  `export type CollectionNames = ${Object.keys(collections)
    .map((v) => JSON.stringify(v))
    .join("|")}`,
)
