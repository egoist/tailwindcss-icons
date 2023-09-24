import { test, expect } from "vitest"
import { generateComponent, getIconCollections } from "./core"

test("generateComponent", () => {
  const collections = getIconCollections(["mdi"])
  expect(
    generateComponent(
      { icons: collections["mdi"], name: "home" },
      {
        scale: 1.5,
      },
    ),
  ).toMatchInlineSnapshot(`
    {
      "--svg": "url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\")",
      "-webkit-mask-image": "var(--svg)",
      "-webkit-mask-repeat": "no-repeat",
      "-webkit-mask-size": "100% 100%",
      "background-color": "currentColor",
      "display": "inline-block",
      "height": "1.5em",
      "mask-image": "var(--svg)",
      "mask-repeat": "no-repeat",
      "mask-size": "100% 100%",
      "width": "1.5em",
    }
  `)
})
