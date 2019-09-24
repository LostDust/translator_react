const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: `./src/app.js`
  },
  output: {
    filename: "[name].js",
    path: path.resolve(`./dist`)
  },
  plugins: [
    new HTMLPlugin({
      template: `./src/index.html`,
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: {
      //           localIdentName: "[name]-[local]"
      //         }
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]-[local]"
              }
            }
          },
          "less-loader"
        ]
      },
      { test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.(jpg|png|gif|svg|ttf|woff|woff2|eot)$/,
        use: "url-loader"
      }
    ]
  }
};
