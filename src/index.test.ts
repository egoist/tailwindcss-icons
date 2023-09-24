import { test, expect } from "vitest"
import postcss from "postcss"
import tailwindcss from "tailwindcss"
import { getIconCollections, iconsPlugin } from "."

test("main", () => {
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

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\")
    }

    .i-tabler-plus {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 5v14m-7-7h14'/%3E%3C/svg%3E\\")
    }

    .foo {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\")
    }

    .bar {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\")
    }
    "
  `)
})

test("custom icon", () => {
  const result = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-foo-home"></span>',
            extension: "html",
          },
        ],
        plugins: [
          iconsPlugin({
            collections: {
              foo: {
                icons: {
                  "arrow-left": {
                    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>',
                    width: 20,
                    height: 20,
                  },
                },
              },
            },
          }),
        ],
      },
    }),
  ]).process(`
.foo {
  @apply i-foo-arrow-left;
}
`)

  expect(result.css).toMatchInlineSnapshot(`
    "
    .foo {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'/%3E%3C/svg%3E\\")
    }
    "
  `)
})
