const {
  iconsPlugin,
  dynamicIconsPlugin,
  getIconCollections,
} = require("../dist/index.cjs");

module.exports = {
  content: ["./index.html"],
  plugins: [
    iconsPlugin({
      scale: 10,
      strokeWidth: 1,
      collections: getIconCollections(["lucide", "mdi"]),
    }),
    dynamicIconsPlugin({ scale: 10 }),
  ],
};
