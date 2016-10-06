var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: "./web/src/app.jsx",
	output: {
		path: "./web/assets",
		filename: "app.js"
	},
	module: {
		loaders: [
			{
				test: /(\.js|\.jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query:
				{
					presets: ['es2015', 'react']
				}
			},
			{
				test: /(\.scss|\.css)$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!sass')
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file?name=public/fonts/[name].[ext]'
			},
			{ test: require.resolve("react"), loader: "expose?React" }
		],
		noParse: [
			// /'react'/g,
		]
	},
	resolve: {
		extensions: ['', '.scss', '.css', '.js', '.jsx', '.json'],
		modulesDirectories: [
			'node_modules',
			path.resolve(__dirname, './node_modules')
		]
	},
	plugins: [
		new ExtractTextPlugin('app.css', { allChunks: true }),
	]
};
