import webpack from "webpack";
import path from "path";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import LodashModuleReplacementPlugin from "lodash-webpack-plugin";
import paths from "./config/paths";
import getStyleLoader from "./tools/getStyleLoaders";

const OPEN_SOURCE_MAP = true;

const isProd = process.env.NODE_ENV === "production";

const REGEXP_SCRIPT = /\.(js|jsx|mjs)$/;
const REGEXP_TYPESCRIPT = /\.(ts|tsx)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const REGEXP_IMAGE = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

const baseConfig = {
  context: paths.appRoot,
  entry: [paths.appIndex],
  bail: !isProd,
  output: {
    publicPath: paths.PUBLIC_PATH,
    path: paths.appDist,
    pathinfo: !isProd,
    filename: isProd ? "js/[name].[hash].bundle.js" : "js/[name].bundle.js",
    chunkFilename: isProd
      ? "js/[name].[chunkhash].chunk.js"
      : "js/[name].chunk.js",
  },
  devtool: isProd ? false : "cheap-module-eval-source-map",
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: REGEXP_SCRIPT,
        enforce: "pre",
        include: paths.appSrc,
        loader: "eslint-loader",
        options: { cache: true, quiet: true },
      },
      {
        test: REGEXP_TYPESCRIPT,
        enforce: "pre",
        include: paths.appSrc,
        loader: "tslint-loader",
      },
      {
        oneOf: [
          {
            test: REGEXP_IMAGE,
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "img/[name].[hash:8].[ext]",
            },
          },
          {
            test: REGEXP_SCRIPT,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
          {
            test: REGEXP_TYPESCRIPT,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
            }),
            sideEffects: true,
          },
          {
            test: cssModuleRegex,
            exclude: paths.appNodeModules,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
            }),
            sideEffects: true,
          },
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
              useLess: true,
            }),
            sideEffects: true,
          },
          {
            test: lessModuleRegex,
            exclude: paths.appNodeModules,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
              useLess: true,
            }),
            sideEffects: true,
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            include: paths.appSrc,
            loader: "file-loader", // 其它文件
            options: {
              name: "other/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ProgressBarPlugin(),
    new LodashModuleReplacementPlugin({
      paths: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(paths.appSrc),
    },
    extensions: [".js", "jsx", ".ts", "tsx", ".json"],
  },
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
  stats: {
    children: true,
    modules: true,
    performance: true,
  },
};

export default baseConfig;
