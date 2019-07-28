const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	entry: './src/index.tsx',

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({
		template: path.resolve(__dirname, './index.html')
	})],

	module: {
		rules: [
			{
				test: /.(js|ts|tsx)?$/,
				include: [path.resolve(__dirname, 'src')],
				use: {
					loader: 'babel-loader',
					options: {
						// customize: './babel.config.js',
						cacheDirectory: '.BabelCache'
					},
				},
				exclude: [/node_modules/],
			}
		],
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'all',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: false
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
