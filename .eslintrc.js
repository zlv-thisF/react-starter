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
    "no-param-reassign": "off",
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
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
