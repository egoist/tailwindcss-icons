import postcss from "postcss"
import tailwindcss from "tailwindcss"
import { expect, test } from "vitest"

import { dynamicIconsPlugin, getIconCollections, iconsPlugin } from "."

test("main", async () => {
  const result = await postcss([
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

        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z'/%3E%3C/svg%3E")
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

        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 5v14m-7-7h14'/%3E%3C/svg%3E")
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

        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z'/%3E%3C/svg%3E")
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

        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z'/%3E%3C/svg%3E")
    }
    "
  `)
})

test("custom icon", async () => {
  const result = await postcss([
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
                  animate: {
                    body: `<circle fill="currentColor" stroke="none" cx="25" cy="10" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" from="0" to="1" repeatCount="indefinite" begin="0.1"/></circle>`,
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

.bar {
  @apply i-foo-animate;
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

        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'/%3E%3C/svg%3E")
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

        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Ccircle fill='black' stroke='none' cx='25' cy='10' r='6'%3E%3Canimate attributeName='opacity' dur='1s' values='0;1;0' from='0' to='1' repeatCount='indefinite' begin='0.1'/%3E%3C/circle%3E%3C/svg%3E")
    }
    "
  `)
})

test("set collection automatically", async () => {
  const processor = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: "",
            extension: "html",
          },
        ],
        plugins: [iconsPlugin()],
      },
    }),
  ])

  const result = await processor.process(`
.foo {
  @apply i-heroicons-arrow-left;
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
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'/%3E%3C/svg%3E")
    }
    "
  `)

  await expect(() =>
    processor.process(`
  .foo {
    @apply i-mdi-home;
  }
  `),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `[CssSyntaxError: <css input>:3:5: The \`i-mdi-home\` class does not exist. If \`i-mdi-home\` is a custom class, make sure it is defined within a \`@layer\` directive.]`,
  )
})

test("custom icon collection name", async () => {
  const result = await postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-hero-archive-box"></span>',
            extension: "html",
          },
        ],
        plugins: [
          iconsPlugin({
            collections: getIconCollections(["heroicons"]),
            collectionNamesAlias: {
              heroicons: "hero",
            },
          }),
        ],
      },
    }),
  ]).process(`@tailwind components;
.foo {
  @apply i-hero-academic-cap;
}`)

  expect(result.css).toMatchInlineSnapshot(`
    ".i-hero-archive-box {
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
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125'/%3E%3C/svg%3E")
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
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41a60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84a51.39 51.39 0 0 0-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5m0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'/%3E%3C/svg%3E")
    }"
  `)
})

test("generate icon dynamically", async () => {
  const result = await postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-heroicons-archive-box"></span>',
            extension: "html",
          },
        ],
        plugins: [iconsPlugin(), dynamicIconsPlugin()],
      },
    }),
  ]).process(`@tailwind components;
.foo {
  @apply i-[mdi--home];
}`)

  expect(result.css).toMatchInlineSnapshot(`
    ".i-heroicons-archive-box {
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
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125'/%3E%3C/svg%3E")
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
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z'/%3E%3C/svg%3E")
    }"
  `)
})

test("get all icon explicitly", async () => {
  const result = await postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-heroicons-archive-box"></span>',
            extension: "html",
          },
        ],
        plugins: [iconsPlugin({ collections: getIconCollections("all") })],
      },
    }),
  ]).process(`@tailwind components;
.foo {
  @apply i-mdi-home;
}`)

  expect(result.css).toMatchInlineSnapshot(`
    ".i-heroicons-archive-box {
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
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125'/%3E%3C/svg%3E")
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
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z'/%3E%3C/svg%3E")
    }"
  `)
})
