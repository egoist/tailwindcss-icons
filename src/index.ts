import { IconifyJSON } from "@iconify/types"
import plugin from "tailwindcss/plugin.js"
import { parseIconSet } from "@iconify/utils"
import { generateIconComponent, getIconCollections } from "./core"
import { CollectionNames } from "../types"

export { getIconCollections, type CollectionNames }

export const iconsPlugin = ({
  collections,
}: {
  collections: Record<string, IconifyJSON>
}) => {
  const components: Record<string, Record<string, string>> = {}

  for (const prefix of Object.keys(collections)) {
    const collection = collections[prefix]
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
