const { iconsPlugin, dynamicIconsPlugin } = require("../dist");

module.exports = {
  content: ["./index.html"],
  plugins: [iconsPlugin(), dynamicIconsPlugin()],
};
