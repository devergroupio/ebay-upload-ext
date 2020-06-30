const path = require("path");

module.exports = {
  entry: {
    // utils: "./src/utils/index.js",
    content: "./src/js/content.js",
    iframe_inject: './src/js/upload_iframe.inject.js'
  },
  output: {
    path: path.resolve(__dirname, "./js"),
    filename: "[name].min.js",
  },
};
