import { test, expect } from "vitest"
import { generateComponent, getIconCollections } from "./core"

test("generateComponent", () => {
  const collections = getIconCollections(["mdi"])
  expect(
    generateComponent(
      { icons: collections["mdi"], name: "home" },
      {
        scale: 1.5,
        extraProperties: {
          "-webkit-mask-size": "contain",
          "-webkit-mask-position": "center",
        },
      },
    ),
  ).toMatchInlineSnapshot(`
    {
      "--svg": "url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\")",
      "-webkit-mask": "no-repeat center / 100%",
      "-webkit-mask-image": "var(--svg)",
      "-webkit-mask-position": "center",
      "-webkit-mask-size": "contain",
      "background-color": "currentColor",
      "display": "inline-block",
      "height": "1.5em",
      "mask": "no-repeat center / 100%",
      "mask-image": "var(--svg)",
      "width": "1.5em",
    }
  `)
})
