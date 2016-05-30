var path = require("path");
var fs = require("fs");
var webpack = require("webpack");
var AssetsPlugin = require("assets-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

var development = !process.env.RAILS_ENV || process.env.RAILS_ENV === "development";

var config = {
  entry: {
    application: "application"
  },
  output: {
    path: path.join(__dirname, "public", "webpack"),
    filename: development ? "[name].js" : "[name]-[hash].js",
    publicPath: development ? "http://localhost:8080/" : "/webpack/",
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
      {test: /\.jsx?$/, loader: "babel-loader?cacheDirectory&presets[]=es2015&presets[]=react&plugins[]=react-require", exclude: /node_modules/},
      {test: /\.coffee$/, loader: "coffee-loader"},
      {test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/, loader: "file"}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        NODE_ENV: process.env.RAILS_ENV
      })
    }),
    new AssetsPlugin({path: path.join(__dirname)})
  ],
  resolve: {
    root: [
      path.join(__dirname, "app", "webpack", "javascripts"),
      path.join(__dirname, "app", "webpack", "stylesheets"),
      path.join(__dirname, "app", "webpack", "images")
    ],
    extensions: ["", ".js", ".jsx", ".coffee"]
  },
  sassLoader: {
    includePaths: [
      path.join(__dirname, "node_modules")
    ]
  }
};

if (fs.existsSync(path.join(__dirname, "node_modules", "react-hot-loader"))) {
  config.module.loaders.unshift({test: /\.jsx?$/, loader: "react-hot"});
}

if (development) {
  config.devtool = "#eval-cheap-module-inline-source-map";
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({sourceMap: false, compress: {warnings: false}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CompressionPlugin()
  );
  config.bail = true;
}

module.exports = config;
