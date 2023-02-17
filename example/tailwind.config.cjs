module.exports = {
  conntent: ["./index.html"],
  plugins: [
    require("../dist").iconsPlugin({
      collections: require("../dist").getIconCollections(["heroicons"]),
    }),
  ],
}
