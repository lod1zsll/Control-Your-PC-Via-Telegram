const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
var path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/Application"),
      "@assets": path.resolve(__dirname, "client/assets"),
    },
    extensions: [".js", ".mjs", ".jsx", ".ts", ".tsx", ".scss", ".svg"],
    fallback: {
      crypto: false,
      stream: false,
      url: false,
      assert: false
    },
  },
  entry: {
    index: path.resolve(__dirname, "./client/index.tsx")
  },

  output: {
    filename: '[name].bundle.js',
    path: __dirname + "/dist/static/assets/client/",
  },

  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    hot: true,
    port: 4444
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|png|jpe?g|svg|mp3)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'vendor-react',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [new HtmlWebpackPlugin({
    template: "./client/index.html",
    /* filename: "index.ejs" */
  }), new CompressionPlugin(),
  ],
}
