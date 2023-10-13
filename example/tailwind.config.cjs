module.exports = {
  content: ["./index.html"],
  plugins: [
    require("../dist").iconsPlugin(),
  ],
}
