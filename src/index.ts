import { IconifyJSONIconsData } from "@iconify/types"
import plugin from "tailwindcss/plugin.js"
import { parseIconSet } from "@iconify/utils"
import { generateIconComponent, getIconCollections } from "./core"
import { CollectionNames } from "../types"
import { type Optional } from "./utils"

export { getIconCollections, type CollectionNames }

export const iconsPlugin = ({
  collections,
}: {
  collections: Record<string, Optional<IconifyJSONIconsData, "prefix">>
}) => {
  const components: Record<string, Record<string, string>> = {}

  for (const prefix of Object.keys(collections)) {
    const collection: IconifyJSONIconsData = {
      ...collections[prefix],
      prefix,
    }
    parseIconSet(collection, (name, data) => {
      if (!data) return
      components[`${prefix}-${name}`] = generateIconComponent(data)
    })
  }

  return plugin(({ matchComponents }) => {
    matchComponents(
      {
        i: (value) => {
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
