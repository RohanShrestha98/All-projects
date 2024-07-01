module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/prettier",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    project: ["tsconfig.json", "vite.config.ts"],
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  root: true,
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/display-name": [0, { ignoreTranspilerName: true }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
