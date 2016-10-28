var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

var prod = process.env.NODE_ENV === 'prod'
var dev = process.env.NODE_ENV === 'dev'

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname),
		filename: 'bundle.js'
	},
	resolve: {
		root: path.resolve(__dirname),
		extensions: ['', '.js', '.scss'],
		alias: {
			src: path.resolve(__dirname) + '/src',
			scss: path.resolve(__dirname) + '/src/scss',
			js: path.resolve(__dirname) + '/src/js',
		},
	},
	module: {
		loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader' 
			}
		]
	},
	devServer: {
		progress: true,
		colors: true,
		inline: true,
		historyApiFallback: {
			index: '/test/'
		}
	},
	plugins: []
};

/*
 * Dev
 * --------------------------------------------------
 */
if (dev) {
	module.exports.module.loaders = (module.exports.module.loaders || []).concat([
		{
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		},
	])
}

/*
 * Prod
 * --------------------------------------------------
 */
if (prod) {
	module.exports.module.loaders = (module.exports.module.loaders || []).concat([
		{ 
			test: /\.scss$/, 
			loader: StyleExtHtmlWebpackPlugin.inline('sass')
		}
	])
	module.exports.plugins = (module.exports.plugins || []).concat([
		new HtmlWebpackPlugin({
			cache: false,
			title: 'p5js Experiment',
			template: './src/templates/index.ejs'
		}),
		new StyleExtHtmlWebpackPlugin()
	])
}
