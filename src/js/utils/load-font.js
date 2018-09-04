import FontFaceObserver from 'fontfaceobserver'
import { addClass } from './dom'

const htmlEl = document.documentElement
const TIMEOUT = 5000

function addFont(family) {
	console.log(family)
	//const first = family.split(' ')[0]
	//console.log(first)
	const name = family.toLowerCase().replace(/ /g, '-')
	const className = `loaded-${name}`
	console.log(className)
	addClass(htmlEl, className)
}

function handleError(err) {
	console.error(err)
}

function loadFont(font) {
	console.log(font)
	const { family, weight = 'normal' } = font
	const fontObserver = new FontFaceObserver(family, { weight })
	fontObserver
		.load(null, TIMEOUT)
		.then(() => addFont(font))
		.catch(handleError)
}

function loadFontGroup(group) {
	console.log(group)
	const promises = group.map(font =>
		new Promise((resolve, reject) => {
			const { family, weight, style = 'normal' } = font

			const fontObserver = new FontFaceObserver(family, { weight, style })
			return fontObserver
				.load(null, TIMEOUT)
				.then(() => resolve(family))
				.catch(err => reject(err))
		})
	)

	Promise.all(promises)
		.then(result => addFont(result[0]))
		.catch(handleError)
}

export { loadFont, loadFontGroup }
