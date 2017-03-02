module.exports = {
	entry: './src/js/entry.js',
	output: {
		filename: 'bundle.js',
		path: './dist/dev',
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
		],
	},
	devtool: 'inline-source-map',
}
