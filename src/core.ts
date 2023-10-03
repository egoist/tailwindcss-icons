import path from "path"
import fs from "fs"
import { IconifyIcon, IconifyJSON } from "@iconify/types"
import { getIconCSS, getIconData } from "@iconify/utils"
import { createRequire } from "module"
import { CollectionNames } from "../types"
import { GenerateOptions } from "./types"

declare const TSUP_FORMAT: "esm" | "cjs"
const req =
  typeof TSUP_FORMAT === "undefined" || TSUP_FORMAT === "cjs"
    ? require
    : createRequire(import.meta.url)

export const localResolve = (cwd: string, id: string) => {
  try {
    const resolved = req.resolve(id, { paths: [cwd] })
    return resolved
  } catch {
    return null
  }
}

function callerPath(): string | null {
  const error = new Error()
  const stack = error.stack?.split("\n") as string[]

  // first path do not contains ( and ) and is not Error
  const data = stack.find(
    (line) => line !== "Error" && !line.includes("(") && !line.includes(")"),
  )
  if (!data) {
    return null
  }

  const filePathPattern = new RegExp(/\s*at ((?:\/\S+)+):\d+:\d+/)
  const result = filePathPattern.exec(data)
  if (!result) {
    return null
  }

  return result[1]
}

export const getIconCollections = (
  include: CollectionNames[] | "all" = "all",
): Record<string, IconifyJSON> => {
  const p = callerPath()
  const cwd = p ? path.dirname(p) : process.cwd()

  const pkgPath = localResolve(cwd, "@iconify/json/package.json")
  if (!pkgPath) {
    if (Array.isArray(include)) {
      return include.reduce((result, name) => {
        const jsonPath = localResolve(cwd, `@iconify-json/${name}/icons.json`)
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

export const generateIconComponent = (
  data: IconifyIcon,
  options: GenerateOptions,
) => {
  const css = getIconCSS(data, {})
  const rules: Record<string, string> = {}
  css.replace(/^\s+([^:]+):\s*([^;]+);/gm, (_, prop, value) => {
    if (prop === "width" || prop === "height") {
      rules[prop] = `${options.scale}em`
    } else {
      rules[prop] = value
    }
    return ""
  })
  if (options.extraProperties) {
    Object.assign(rules, options.extraProperties)
  }
  return rules
}

export const generateComponent = (
  {
    name,
    icons,
  }: {
    name: string
    icons: IconifyJSON
  },
  options: GenerateOptions,
) => {
  const data = getIconData(icons, name)
  if (!data) return null
  return generateIconComponent(data, options)
}
