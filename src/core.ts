import path from "path"
import fs from "fs"
import { IconifyJSON } from "@iconify/types"
import { getIconCSS, getIconData } from "@iconify/utils"
import { CollectionNames } from "../types"

const localResolve = (cwd: string, id: string) => {
  const resolved = require.resolve(id, { paths: [cwd] })
  return resolved
}

export const getIconCollections = (
  include: CollectionNames[] | "all" = "all",
) => {
  const pkgPath = localResolve(process.cwd(), "@iconify/json/package.json")
  if (!pkgPath) return {}
  const pkgDir = path.dirname(pkgPath)
  const files = fs.readdirSync(path.join(pkgDir, "json"))
  const collections: Record<string, IconifyJSON> = {}
  for (const file of files) {
    if (
      include === "all" ||
      include.includes(file.replace(".json", "") as any)
    ) {
      const json: IconifyJSON = require(path.join(pkgDir, "json", file))
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
