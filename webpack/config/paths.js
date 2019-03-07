import path from "path";
import fs from "fs";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export default {
  PUBLIC_PATH: "/",
  appRoot: resolveApp("."),
  appSrc: resolveApp("src"),
  appIndex: resolveApp("src/index"),
  appDist: resolveApp("dist"),
  appNodeModules: resolveApp("node_modules"),
  appFavicon: resolveApp("public/favicon.ico"),
  appHtml: resolveApp("public/index.html"),
  appPublic: resolveApp("public"),
  appDll: resolveApp("dist/dll"),
  appAnalysis: resolveApp("analysis"),
};
