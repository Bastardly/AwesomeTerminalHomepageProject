module.exports = {
    parser: "@typescript-eslint/parser",
    // env: {
    //     browser: true,
    //     node: true,
    //     es6: true,
    //     commonjs: true,
    // },
    extends: ["plugin:prettier/recommended", "prettier", "prettier/react"],
    plugins: ["@typescript-eslint/eslint-plugin", "prettier", "react-hooks", "prettier/react"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
        // "useJSXTextNode": true, // only false if eslint is v4
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
