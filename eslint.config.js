// https://docs.expo.dev/guides/using-eslint/
// eslint.config.js
const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  globalIgnores(["dist/*", "coverage/*", ".expo/*"]),
  expoConfig,
  eslintPluginPrettierRecommended,
]);

module.exports = defineConfig([
  globalIgnores(["dist/*", "coverage/*", ".expo/*"]),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-console": "warn", // flag leftover console.log
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "react-hooks/exhaustive-deps": "error", // missing useEffect deps is a bug
    },
  },
]);
