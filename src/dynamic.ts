import { IconifyJSON } from "@iconify/types"
import { type CollectionNames, availableCollectionNames } from "../types"
import {
  generateComponent,
  getIconCollections,
  type GenerateOptions,
} from "./core"

const cache = new Map<CollectionNames, IconifyJSON>()

function getIconCollection(name: CollectionNames) {
  const cached = cache.get(name)
  if (cached) return cached

  const collection = getIconCollections([name])[name]
  if (collection) cache.set(name, collection)
  return collection
}

export function getDynamicCSSRules(
  icon: string,
  options: GenerateOptions,
): Record<string, string> {
  const nameParts = icon.split(/--|\:/)
  if (nameParts.length !== 2) {
    throw new Error(`Invalid icon name: "${icon}"`)
  }

  const [prefix, name] = nameParts
  if (!availableCollectionNames.includes(prefix as CollectionNames)) {
    throw new Error(`Invalid collection name: "${prefix}"`)
  }

  const icons = getIconCollection(prefix as CollectionNames)

  const generated = generateComponent(
    {
      icons,
      name,
    },
    options,
  )
  if (!generated) {
    throw new Error(`Invalid icon name: "${icon}"`)
  }

  return generated
}
