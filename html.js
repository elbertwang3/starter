const fs = require('fs')
const handlebars = require('handlebars')
const inline = require('inline-source')
const mkdirp = require('mkdirp')

const dev = process.argv[2] === '--dev'
const out = dev ? 'dev' : 'dist'

function registerPartials() {
	const files = fs.readdirSync('src/html/partials').filter(d => d.endsWith('.hbs'))

	files.forEach((file) => {
		const name = file.replace('.hbs', '')
		const content = fs.readFileSync(`src/html/partials/${file}`, 'utf-8')
		handlebars.registerPartial(name, content)
	})

	return Promise.resolve()
}

function loadData() {
	const files = fs.readdirSync('src/html/data').filter(d => d.endsWith('.json'))

	const data = files.reduce((prev, file) => {
		const name = file.replace('.json', '')
		const content = fs.readFileSync(`src/html/data/${file}`, 'utf-8')
		const json = JSON.parse(content)
		prev[name] = json
		return prev
	}, {})

	return Promise.resolve(data)
}

function compileTemplate(data) {
	const content = fs.readFileSync('src/html/index.hbs', 'utf-8')

	const template = handlebars.compile(content)
	const result = template(data)

	mkdirp.sync('.tmp')
	fs.writeFileSync('.tmp/index.html', result)

	return Promise.resolve()
}

function inlineSvg() {
	return new Promise((resolve, reject) => {
		inline('.tmp/index.html', {
			ignore: dev ? ['link','script'] : null,
			rootpath: `${out}`,
		}, (err, html) => {
			if (err) reject(err)
			else {
				fs.writeFileSync(`${out}/index.html`, html)
				resolve()
			}
		})
	})
}

function init() {
	// console.log(process.argv)
	console.time('compile hbs')
	registerPartials()
		.then(loadData)
		.then(compileTemplate)
		.then(inlineSvg)
		.then(() => console.timeEnd('compile hbs'))
		.catch(err => console.log(err))
}

init()
