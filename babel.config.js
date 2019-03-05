module.exports = {
  plugins: [
    ["babel-plugin-lodash"],
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/plugin-proposal-class-properties"],
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
