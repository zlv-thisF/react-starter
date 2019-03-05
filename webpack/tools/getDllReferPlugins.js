import webpack from "webpack";
import path from "path";
import config from "../config/config";
import paths from "../config/paths";

const getDllReferPlugins = entries => {
  const names = Object.keys(entries);
  const { USE_DLL } = config;
  if (!USE_DLL) {
    return [];
  }
  return names.map(
    name =>
      new webpack.DllReferencePlugin({
        manifest: path.resolve(paths.appDll, `${name}.manifest.json`),
      })
  );
};

export default getDllReferPlugins;
