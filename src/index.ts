import { IconifyJSONIconsData } from "@iconify/types"
import plugin from "tailwindcss/plugin.js"
import { parseIconSet } from "@iconify/utils"
import {
  generateIconComponent,
  getIconCollections,
  isPackageExists,
} from "./core"
import { CollectionNames, availableCollectionNames } from "../types"
import { type Optional } from "./utils"
import { IconsOptions } from "./types"

export { getIconCollections, type CollectionNames }

type CollectionNamesAlias = {
  [key in CollectionNames]?: string
}

export type IconsPluginOptions = {
  collections?: Record<string, Optional<IconifyJSONIconsData, "prefix">>
  /**
   * alias to customize collection names
   * @default {}
   */
  collectionNamesAlias?: CollectionNamesAlias
} & IconsOptions

export const iconsPlugin = (iconsPluginOptions?: IconsPluginOptions) => {
  const {
    collections: propsCollections,
    scale = 1,
    prefix = "i",
    extraProperties = {},
    collectionNamesAlias = {},
  } = iconsPluginOptions ?? {}

  const collections =
    propsCollections ??
    getIconCollections(
      availableCollectionNames.filter((name) =>
        isPackageExists(`@iconify-json/${name}`),
      ),
    )
  const components: Record<string, Record<string, string>> = {}

  for (const prefix of Object.keys(collections)) {
    const collection: IconifyJSONIconsData = {
      ...collections[prefix],
      prefix,
    }
    parseIconSet(collection, (name, data) => {
      if (!data) return
      const collectionName =
        collectionNamesAlias[prefix as CollectionNames] ?? prefix
      components[`${collectionName}-${name}`] = generateIconComponent(data, {
        scale,
        extraProperties,
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
