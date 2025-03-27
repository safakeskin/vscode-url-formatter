const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Update this to the correct entry file
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  mode: "production", // Explicitly set the mode to avoid the warning
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  externals: {
    vscode: "commonjs vscode", // Exclude the vscode module
  },
};
