const path = require("path");

module.exports = {
  entry: "./src/utils/index.js",

  output: {
    path: path.resolve(__dirname, "./js"),
    filename: "utils.min.js",
  },
};
