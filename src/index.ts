import { IconifyJSONIconsData } from "@iconify/types"
import plugin from "tailwindcss/plugin.js"
import { parseIconSet } from "@iconify/utils"
import {
  type GenerateOptions,
  generateIconComponent,
  getIconCollections,
  isPackageExists,
} from "./core"
import { getDynamicCSSRules } from "./dynamic"
import { CollectionNames, availableCollectionNames } from "../types"
import { type Optional } from "./utils"

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
  /**
   * Class prefix for matching icon rules.
   *
   * @default `i`
   */
  prefix?: string
} & GenerateOptions

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

export const dynamicIconsPlugin = (
  iconsPluginOptions?: Omit<
    IconsPluginOptions,
    "collections" | "collectionNamesAlias"
  >,
) => {
  const {
    prefix = "i",
    scale = 1,
    extraProperties = {},
  } = iconsPluginOptions ?? {}

  return plugin(({ matchComponents }) => {
    matchComponents({
      [prefix]: (value) =>
        getDynamicCSSRules(value, { scale, extraProperties }),
    })
  })
}
