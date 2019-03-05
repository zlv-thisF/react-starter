import webpack from "webpack";
import path from "path";
import paths from "./config/paths";

const dllConfig = {
  // better not more than 6 entries
  entry: {
    react: ["react"],
    reactDOM: ["react-dom"],
    "mobx-react": ["mobx-react-lite"],
    mobx: ["mobx"],
  },
  output: {
    path: paths.appDll,
    filename: "[name].js",
    library: "[name]_library",
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(paths.appDll, "[name].manifest.json"),
      name: "[name]_library",
    }),
  ],
};

export default dllConfig;
