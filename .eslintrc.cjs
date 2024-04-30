module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: "current", "jest/globals": true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "vite.config.ts",
    "jest.config.ts",
      'setupTests.ts',
    "src/tests",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "jest"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },

  settings: {
    react: {
      version: "detect",
    },
  },
};
