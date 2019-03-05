import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackIncludeAssetsPlugin from "html-webpack-include-assets-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import baseConfig from "./webpack.base.babel";
import dllConfig from "./webpack.dll.babel";
import getDllReferPlugins from "./tools/getDllReferPlugins";
import paths from "./config/paths";
import config from "./config/config";

const { USE_DLL } = config;
const IS_ANALYSIS = process.argv.includes("--analysis");

const prodConfig = {
  ...baseConfig,
  mode: "production",
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    USE_DLL &&
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [{ path: "dll", glob: "*.js" }],
        append: true,
      }),
    ...getDllReferPlugins(dllConfig.entry),
    IS_ANALYSIS && new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin([paths.appDist], {
      root: paths.appRoot,
      exclude: USE_DLL ? ["dll"] : [],
    }),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: true,
    minimize: true, // true when mode === 'production'
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true, // improvement: multiple-process
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          mangle: true, // 混淆命名
          ie8: false, // 支持ie8?
          safari10: true, // fix 10 11 bugs
        },
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: "cssnano",
        cssProcessorPluginOptions: {
          preset: [
            "advanced",
            {
              discardComments: { removeAll: true },
              autoprefixer: true,
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /\/node_modules\//,
          name: "vendor",
          chunks: "initial",
          enforce: true,
        },
      },
    },
  },
};

export default prodConfig;
