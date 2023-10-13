// @ts-check
import { createRequire } from "module"
import fs from "fs"

const req = createRequire(import.meta.url)
const collections = req("@iconify/json/collections.json")

fs.writeFileSync(
  "types.ts",
  `export const availableCollectionNames = [${Object.keys(
    collections,
  )
    .map((v) => JSON.stringify(v))
    .join(", ")}] as const
/** All the available icon collections when you have \`@iconify/json\` installed  */\nexport type CollectionNames = typeof availableCollectionNames[number]
`,
)
