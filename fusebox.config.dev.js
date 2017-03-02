const fsbx = require('fuse-box')

module.exports = {
	homeDir: './src/js',
	outFile: './dev/bundle.js',
	sourceMap: {
		bundleReference: 'sourcemaps.js.map',
		outFile: 'sourcemaps.js.map',
	},
	plugins: [
		fsbx.BabelPlugin({
			config: {
				sourceMaps: true,
				presets: ['es2015', 'stage-1'],
			},
		}),
		fsbx.SourceMapPlainJsPlugin(),
	],
}
