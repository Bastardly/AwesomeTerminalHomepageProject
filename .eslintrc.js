module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        // "eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "prettier/react",
        "prettier/@typescript-eslint",
        "prettier/standard",
    ],
    globals: {
        jest: "writable",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
        // "useJSXTextNode": true, // only false if eslint is v4
    },
    plugins: ["prettier", "react", "plugin:@typescript-eslint/eslint-plugin"],
    rules: {
        "prettier/prettier": ["error", { singleQuote: true, parser: "flow" }],
    },
};
