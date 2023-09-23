import { IconifyJSONIconsData } from "@iconify/types"
import plugin from "tailwindcss/plugin.js"
import { parseIconSet } from "@iconify/utils"
import { generateIconComponent, getIconCollections } from "./core"
import { CollectionNames } from "../types"
import { type Optional } from "./utils"
import { IconsOptions } from "./types"

export { getIconCollections, type CollectionNames }

export const iconsPlugin = ({
  collections,
  options,
}: {
  collections: Record<string, Optional<IconifyJSONIconsData, "prefix">>
  options?: IconsOptions
}) => {
  const { scale = 1, prefix = "i" } = options ?? {}

  const components: Record<string, Record<string, string>> = {}

  for (const prefix of Object.keys(collections)) {
    const collection: IconifyJSONIconsData = {
      ...collections[prefix],
      prefix,
    }
    parseIconSet(collection, (name, data) => {
      if (!data) return
      components[`${prefix}-${name}`] = generateIconComponent(data, {
        scale,
      })
    })
  }

  return plugin(({ matchComponents }) => {
    matchComponents(
      {
        [prefix]: (value) => {
          if (typeof value === "string") return components[value]
          return value
        },
      },
      {
        values: components,
      },
    )
  })
}
