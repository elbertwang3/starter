import * as d3 from 'd3'

export default function() {
	d3.select('body').style('background-color', `rgba(255,150,0,${Math.random()}`)
	d3.select('body').append('p')
		.text(Math.round(Math.random() * 1000))
		.style('margin-top', '5rem')
}
