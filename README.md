**💛 You can help the author become a full-time open-source maintainer by [sponsoring him on GitHub](https://github.com/sponsors/egoist).**

---

# @egoist/tailwindcss-icons

> Use any icon from [Iconify](https://iconify.design/)

[![npm version](https://badgen.net/npm/v/@egoist/tailwindcss-icons)](https://npm.im/@egoist/tailwindcss-icons) [![npm downloads](https://badgen.net/npm/dm/@egoist/tailwindcss-icons)](https://npm.im/@egoist/tailwindcss-icons)

<img src="https://user-images.githubusercontent.com/8784712/219618866-e5632d23-b948-4fa1-b3d6-00581a704bca.png" alt="preview" width="700" />

## Install

```bash
npm i @egoist/tailwindcss-icons
```

## Usage

In your `tailwind.config.js`:

```js
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

module.exports = {
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["mdi", "lucide"]),
    }),
  ],
}
```

You also need to install `@iconify/json` (full icon collections, 50MB) or `@iconify-json/{collection_name}` (individual icon package)

Then you can use the icons in your HTML:

```html
<!-- pattern: i-{collection_name}-{icon_name} -->
<span class="i-mdi-home"></span>
```

Search the icon you want to use here: https://icones.js.org

### Custom Icons

You can also use custom icons with this plugin, for example:

```js
module.exports = {
  plugins: [
    iconsPlugin({
      collections: {
        foo: {
          icons: {
            "arrow-left": {
              // svg body
              body: '<path d="M10 19l-7-7m0 0l7-7m-7 7h18"/>',
              // svg width and height, optional
              width: 24,
              height: 24,
            },
          },
        },
      },
    }),
  ],
}
```

Then you can use this custom icon as class name: `i-foo-arrow-left`.

## Sponsors

[![sponsors](https://sponsors-images.egoist.dev/sponsors.svg)](https://github.com/sponsors/egoist)

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
