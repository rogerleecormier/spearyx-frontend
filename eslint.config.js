import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import importHelpers from "eslint-plugin-import-helpers";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: [
      "node_modules/*",
      "dist/*",
      ".tanstack/*",
      ".output/*",
      ".nitro/*",
      ".wrangler/**/*",
      "**/.wrangler/**/*",
      "**/*.json",
      "routeTree.gen.ts",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescript,
      import: importPlugin,
      "import-helpers": importHelpers,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_|^T[A-Z]", // Allow TypeScript generic type parameters like TData, TValue
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn", // Changed from "off" to "warn" for better type safety
      "@typescript-eslint/explicit-function-return-type": "off",

      // Import rules
      "import/no-duplicates": "error",
      "import-helpers/order-imports": [
        "error",
        {
          newlinesBetween: "always",
          groups: [
            ["/^react/", "/^@?\\w/"],
            ["module"],
            ["/^@//"],
            ["parent", "sibling", "index"],
          ],
          alphabetize: {
            order: "asc",
            ignoreCase: true,
          },
        },
      ],
    },
  },
];
