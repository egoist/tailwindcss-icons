import { test, expect } from "vitest"
import postcss from "postcss"
import tailwindcss from "tailwindcss"
import { getIconCollections, iconsPlugin } from "."

test("main", async () => {
  const result = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-tabler-plus"><i class="i-mdi-home"></i></span>',
            extension: "html",
          },
        ],
        plugins: [
          iconsPlugin({
            collections: getIconCollections(["mdi", "tabler"]),
          }),
        ],
      },
    }),
  ]).process(`
@tailwind components;

.foo {
    @apply i-mdi-home;
}

.bar {
    @apply i-mdi-house;
}
`)

  expect(result.css).toMatchInlineSnapshot(`
    ".i-mdi-home {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask: no-repeat center / 100%;

        mask: no-repeat center / 100%;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\")
    }

    .i-tabler-plus {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask: no-repeat center / 100%;

        mask: no-repeat center / 100%;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 5v14m-7-7h14'/%3E%3C/svg%3E\\")
    }

    .foo {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask: no-repeat center / 100%;

        mask: no-repeat center / 100%;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\")
    }

    .bar {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask: no-repeat center / 100%;

        mask: no-repeat center / 100%;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\")
    }
    "
  `)
})
