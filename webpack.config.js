module.exports = {
  entry: "./index.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      src: 'src',
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
};
