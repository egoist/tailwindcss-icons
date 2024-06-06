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

type CollectionAlias = {
  /**
   * Iconify Collection name
   */
  collection: CollectionNames
} & GenerateOptions

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
  /**
   * collection aliases to, e.g., add extra properties, without modifying all
   *
   * @default {}
   */
  collectionAliases?: Record<string, CollectionAlias>
} & GenerateOptions

export const iconsPlugin = (iconsPluginOptions?: IconsPluginOptions) => {
  const {
    collections: propsCollections,
    scale = 1,
    prefix = "i",
    extraProperties = {},
    strokeWidth,
    collectionNamesAlias = {},
    collectionAliases = {},
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

  const filteredAliases = Object.keys(collectionAliases)
    .map((key) => ({ key: key, alias: collectionAliases[key] }))
    .flatMap((alias) => (alias?.alias?.collection ? [alias] : []))

  for (const entry of filteredAliases) {
    const iconCollection = getIconCollections([entry.alias!.collection])

    const collection: IconifyJSONIconsData = {
      ...iconCollection[entry.alias!.collection],
      prefix: entry.alias!.collection,
    }
    parseIconSet(collection, (name, data) => {
      if (!data) return
      components[`${entry.key}-${name}`] = generateIconComponent(data, {
        scale: entry.alias!.scale ?? scale,
        extraProperties: entry.alias!.extraProperties ?? extraProperties,
        strokeWidth: entry.alias!.strokeWidth ?? strokeWidth,
      })
    })
  }

  return plugin(({ matchComponents }) => {
    matchComponents(
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
  })
}

export const dynamicIconsPlugin = (
  iconsPluginOptions?: Omit<
    IconsPluginOptions,
    "collections" | "collectionNamesAlias" | "collectionAliases"
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
