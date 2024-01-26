const { iconsPlugin, dynamicIconsPlugin } = require("../dist/index.cjs");

module.exports = {
  content: ["./index.html"],
  plugins: [iconsPlugin(), dynamicIconsPlugin()],
};
