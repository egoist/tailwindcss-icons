module.exports = {
  content: ["./index.html"],
  plugins: [
    require("../dist").iconsPlugin({
      collections: require("../dist").getIconCollections(["heroicons"]),
    }),
  ],
}
