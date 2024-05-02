module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "react-app",
    "prettier",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      2,
      { fixStyle: "separate-type-imports" },
    ],
    "@typescript-eslint/no-restricted-imports": [
      2,
      {
        paths: [
          {
            name: "react-redux",
            importNames: ["useSelector", "useStore", "useDispatch"],
            message:
              "Please use pre-typed versions from `src/app/hooks.ts` instead.",
          },
        ],
      },
    ],
  },

  overrides: [
    { files: ["*.{c,m,}{t,j}s", "*.{t,j}sx"] },
    { files: ["*{test,spec}.{t,j}s?(x)"], env: { jest: true } },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: "./",
    // tsconfigRootDir: __dirname,
  },

  settings: {
    react: {
      version: "detect",
    },
  },
};
