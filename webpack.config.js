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
			{ test: require.resolve("react"), loader: "expose?React" },
			{ test: require.resolve("material-ui"), loader: "expose?Ui" },
			{ test: require.resolve("material-ui/styles/colors"), loader: "expose?Colors" }
		]
	},
	resolve: {
		extensions: ['', '.scss', '.css', '.js', '.jsx', '.json'],
		modulesDirectories: [
			'node_modules',
			path.resolve(__dirname, './node_modules')
		],
		alias: {
			notify$: path.resolve('./core/components/notify.jsx'),
			views: path.resolve('./web/src/views/'),
			components: path.resolve('./web/src/components/')
		}
	},
	plugins: [
		new ExtractTextPlugin('app.css', { allChunks: true }),
	]
};
