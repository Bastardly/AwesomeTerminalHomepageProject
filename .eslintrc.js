module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:prettier/recommended", "prettier", "prettier/react"],
    plugins: ["@typescript-eslint/eslint-plugin", "prettier", "react-hooks", "prettier/react"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": "error",
        "no-console": "error",
    },
    settings: {
        react: {
            pragma: "React",
            version: "detect",
        },
    },
};
