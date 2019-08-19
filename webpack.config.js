const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const src = path.resolve(__dirname, "src");

module.exports = {
    mode: "development",

    entry: "./src/index.tsx",

    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html"),
        }),
    ],

    module: {
        rules: [
            {
                test: /.(js|ts|tsx)?$/,
                include: [src],
                use: {
                    loader: "babel-loader",
                    options: {
                        // customize: './babel.config.js',
                        cacheDirectory: ".BabelCache",
                    },
                },
                exclude: [/node_modules/],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader", // compiles Sass to CSS, using Node Sass by default
                ],
            },
        ],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },

            chunks: "all",
            minChunks: 1,
            minSize: 30000,
            name: true,
        },
    },

    devServer: {
        open: false,
        historyApiFallback: true,
        port: 3000,
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            src,
        },
    },
};
