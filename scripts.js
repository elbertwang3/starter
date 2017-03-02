const fsbx = require('fuse-box')
const configDev = require('./fusebox.config.dev.js')
const configProd = require('./fusebox.config.dist.js')

const dev = process.argv[2] === '--dev'

const fuse = fsbx.FuseBox.init(dev ? configDev : configProd)

if (dev) {
	fuse.devServer('>entry.js', {
		port: 4004,
		httpServer: false,
		hmr: false,
	})
} else {
	fuse.bundle('>entry.js')
}
