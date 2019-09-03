module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
        // project: "./tsconfig.json",
        tsconfigRootDir: "./",
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
    },
    rules: {
        "import/no-cycle": "error",
        "import/no-unresolved": "off",
        "no-console": "error",
        "prettier/prettier": "error",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-var-requires": "off",
    },
};
