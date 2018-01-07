var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        admin: "./admin/index.js",
        consumer: "./consumer/index.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    module: {
	rules: [
	    {
		test: /\.css$/,
		use:[
		    { loader: 'style-loader'},
		    {
		      loader: 'css-loader',
		      options:{
			  modules: true
		      }
		    }
	        ]
	    },
        {
            test: /images/,
            use: [
                {loader: 'file-loader'}
            ]
        },
        {
            test: /icons/,
            use: [{loader: 'url-loader'}]
        },
        {
            test: /\.js/,
            exclude: /node_modules/,
            use: [{loader: 'babel-loader'}]
        }
	]
    }
};
