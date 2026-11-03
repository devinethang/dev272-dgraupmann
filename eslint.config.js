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
