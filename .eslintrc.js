module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react', 'prettier'
  ],
  rules: {
    "prettier/prettier": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "react/jsx-filename-extension": "off",
    "import/no-extraneous-dependencies": [
      "error", {"devDependencies": ["./webpack/**/*", ]}
    ]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ["@", "./src"]
        ],
        extensions: ['.ts', ".tsx",'.js', '.jsx', '.json']
      }
    }
  }
};
