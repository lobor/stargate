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
							test: /(\.js|\.jsx)$/,         // Match both .js and .jsx files
							exclude: /node_modules/, 
							loader: "babel", 
							query:
								{
									presets:['es2015', 'react']
								}
						},
						{
							test: /(\.scss|\.css)$/,
							loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')
						}
        ]
    },
		resolve: {
        extensions: ['', '.scss', '.css', '.js', '.jsx','.json'],
				modulesDirectories: [
					'node_modules',
					path.resolve(__dirname, './node_modules')
				]
    },
		plugins: [
			new ExtractTextPlugin('app.css', { allChunks: true }),
			new webpack.HotModuleReplacementPlugin(),
		]
};