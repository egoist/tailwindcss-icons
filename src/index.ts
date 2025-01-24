import { parseIconSet } from "@iconify/utils"
import plugin from "tailwindcss/plugin.js"

import { collectionNames } from "../types"
import {
  generateIconComponent,
  getIconCollections,
  isPackageExists,
} from "./core"
import { getDynamicCSSRules } from "./dynamic"

import type { CollectionNames } from "../types"
import type { GenerateOptions } from "./core"
import type { Optional } from "./utils"
import type { IconifyJSONIconsData } from "@iconify/types"

export { getIconCollections, collectionNames, type CollectionNames }

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

type PluginFn = Parameters<typeof plugin>[0]
const getPluginFunction = (
  iconsPluginOptions?: IconsPluginOptions,
): PluginFn => {
  const {
    collections: propsCollections,
    scale = 1,
    prefix = "i",
    extraProperties = {},
    strokeWidth,
    collectionNamesAlias = {},
  } = iconsPluginOptions ?? {}

  const collections =
    propsCollections ??
    getIconCollections(
      collectionNames.filter((name) =>
        isPackageExists(`@iconify-json/${name}`),
      ),
    )
  const components: Record<string, Record<string, string>> = {}

  for (const prefix of Object.keys(collections) as CollectionNames[]) {
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
        strokeWidth,
      })
    })
  }
  return ({ matchComponents }) => {
    matchComponents(
      // @ts-expect-error figure out is this ok
      {
        [prefix]: (value) => {
          if (typeof value === "string") return components[value] ?? null
          return value
        },
      },
      {
        values: components,
      },
    )
  }
}

export const iconsPlugin = (iconsPluginOptions?: IconsPluginOptions) => {
  return plugin(getPluginFunction(iconsPluginOptions))
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
    strokeWidth,
    extraProperties = {},
  } = iconsPluginOptions ?? {}

  return plugin(({ matchComponents }) => {
    matchComponents({
      [prefix]: (value) =>
        getDynamicCSSRules(value, { scale, extraProperties, strokeWidth }),
    })
  })
}

export default plugin.withOptions<IconsPluginOptions>((iconsPluginOptions) => {
  return getPluginFunction(iconsPluginOptions)
})
