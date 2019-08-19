module.exports = function(api) {
    api.cache(true);
    // const isTest = process.env('test');
    // const isTest = true;

    const presets = [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: 3,
            },
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ];
    const plugins = [
        "syntax-dynamic-import",
        "@babel/plugin-transform-runtime",
        [
            "module-resolver",
            {
                root: ["."],
                alias: {
                    src: "./src",
                },
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
