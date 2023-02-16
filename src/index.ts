import { IconifyJSON } from "@iconify/types"
import plugin from "tailwindcss/plugin"
import { generateComponent, getIconCollections } from "./core"

export { getIconCollections }

export const iconsPlugin = ({
  collections,
}: {
  collections: Record<string, IconifyJSON>
}) => {
  const components: Record<string, Record<string, string>> = {}

  for (const prefix of Object.keys(collections)) {
    const collection = collections[prefix]
    for (const name of Object.keys(collection.icons)) {
      const component = generateComponent({
        name: name,
        icons: collection,
      })
      if (!component) continue

      components[`${prefix}-${name}`] = component
    }
  }

  return plugin(({ matchComponents, theme }) => {
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
