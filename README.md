**💛 You can help the author become a full-time open-source maintainer by [sponsoring him on GitHub](https://github.com/sponsors/egoist).**

---

# @egoist/tailwindcss-icons

[![npm version](https://badgen.net/npm/v/@egoist/tailwindcss-icons)](https://npm.im/@egoist/tailwindcss-icons) [![npm downloads](https://badgen.net/npm/dm/@egoist/tailwindcss-icons)](https://npm.im/@egoist/tailwindcss-icons)

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

Then you can use the icons in your HTML:

```html
<span class="i-mdi-home"></span>
```

## Sponsors

[![sponsors](https://sponsors-images.egoist.dev/sponsors.svg)](https://github.com/sponsors/egoist)

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
