import path from "path"
import fs from "fs"
import { IconifyJSON } from "@iconify/types"
import { getIconCSS, getIconData } from "@iconify/utils"
import { createRequire } from "module"
import { CollectionNames } from "../types"

declare const TSUP_FORMAT: "esm" | "cjs"
const req =
  typeof TSUP_FORMAT === "undefined" || TSUP_FORMAT === "cjs"
    ? require
    : createRequire(import.meta.url)

const localResolve = (cwd: string, id: string) => {
  const resolved = req.resolve(id, { paths: [cwd] })
  return resolved
}

export const getIconCollections = (
  include: CollectionNames[] | "all" = "all",
) => {
  const pkgPath = localResolve(process.cwd(), "@iconify/json/package.json")
  if (!pkgPath) {
    if (Array.isArray(include)) {
      return include.reduce((result, name) => {
        const jsonPath = localResolve(
          process.cwd(),
          `@iconify-json/${name}/icons.json`,
        )
        if (!jsonPath) {
          throw new Error(
            `Icon collection "${name}" not found. Please install @iconify-json/${name} or @iconify/json`,
          )
        }
        return {
          ...result,
          [name]: req(jsonPath),
        }
      }, {})
    }
    return {}
  }
  const pkgDir = path.dirname(pkgPath)
  const files = fs.readdirSync(path.join(pkgDir, "json"))
  const collections: Record<string, IconifyJSON> = {}
  for (const file of files) {
    if (
      include === "all" ||
      include.includes(file.replace(".json", "") as any)
    ) {
      const json: IconifyJSON = req(path.join(pkgDir, "json", file))
      collections[json.prefix] = json
    }
  }
  return collections
}

export const generateComponent = ({
  name,
  icons,
}: {
  name: string
  icons: IconifyJSON
}) => {
  const data = getIconData(icons, name)
  if (!data) return null

  const css = getIconCSS(data, {})
  const rules: Record<string, string> = {}
  css.replace(/^\s+([^:]+):\s*([^;]+);/gm, (_, prop, value) => {
    rules[prop] = value
    return ""
  })
  return rules
}
