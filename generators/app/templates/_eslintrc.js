module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["airbnb/base", "airbnb-typescript/base"],
  parserOptions: {
    project: [
      "./tsconfig.json",
      "./tests/unit-tests/tsconfig.json",
      "./tests/features/tsconfig.json",
      "./.eslintrc.js",
      "./stryker.conf.js",
    ],
  },
  ignorePatterns: ["stryker.conf.js", "tests/cucumberHtmlReporter.js"],
  rules: {
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "import/export": "off",
    "arrow-body-style": ["error", "always"],
  },
};
