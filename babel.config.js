module.exports = {
  plugins: [
    ["babel-plugin-lodash"],
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["babel-plugin-import", { libraryName: "antd", style: true }],
  ],
  presets: [
    ["@babel/preset-env", { useBuiltIns: "usage", modules: false }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
  ],
  overrides: [
    {
      test: ["./webpack/**/*"],
      presets: [["@babel/preset-env"]],
    },
  ],
};
