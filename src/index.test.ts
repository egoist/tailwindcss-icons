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
        -webkit-mask: no-repeat center / 100%;
        mask: no-repeat center / 100%;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'/%3E%3C/svg%3E\\")
    }
    "
  `)
})

test("set collection automatically", () => {
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

  const result = processor.process(`
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
        -webkit-mask: no-repeat center / 100%;
        mask: no-repeat center / 100%;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'/%3E%3C/svg%3E\\")
    }
    "
  `)

  expect(() => {
    processor.process(`
  .foo {
    @apply i-mdi-home;
  }
  `).css
  }).toThrowErrorMatchingInlineSnapshot(
    '"<css input>:3:5: The `i-mdi-home` class does not exist. If `i-mdi-home` is a custom class, make sure it is defined within a `@layer` directive."',
  )
})

test("custom icon collection name", () => {
  const result = postcss([
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
        -webkit-mask: no-repeat center / 100%;
        mask: no-repeat center / 100%;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'/%3E%3C/svg%3E\\")
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
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41a60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84a51.39 51.39 0 0 0-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'/%3E%3C/svg%3E\\")
    }"
  `)
})
