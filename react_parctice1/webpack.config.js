var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query:{
				presets:['react', 'es2015']
			}
		}]
	}
};