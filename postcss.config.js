module.exports = ({ parser }) => ({
  parser: parser ? "sugarss" : false,
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    },
    cssnano: {},
  },
});
