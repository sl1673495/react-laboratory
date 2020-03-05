module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/jsx-filename-extension": 0,
    "linebreak-style": 0,
    "react/jsx-one-expression-per-line": 0,
    semi: 0,
    "react/destructuring-assignment": 0,
    "import/prefer-default-export": 0,
    "no-param-reassign": 0,
  },
};
