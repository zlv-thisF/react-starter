import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import paths from "./config/paths";
import proxyConfig from "./config/proxy";
import baseConfig from "./webpack.base.babel";

const devConfig = {
  ...baseConfig,
  devServer: {
    compress: true,
    clientLogLevel: "none",
    contentBase: paths.appPublic,
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: paths.PUBLIC_PATH,
    overlay: {
      warnings: false,
      errors: true,
    },
    useLocalIp: true,
    host: "0.0.0.0",
    port: 8080,
    open: true,
    proxy: { ...proxyConfig },
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    runtimeChunk: true,
  },
};

export default devConfig;
