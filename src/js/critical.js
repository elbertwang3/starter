import Promise from 'promise-polyfill';
import './polyfills/startsWith';
import './polyfills/endsWith';
import './polyfills/findIndex';
import './polyfills/find';
import './polyfills/includes';
import { loadFontGroup } from './utils/load-font';

const lora = [
	{ family: 'Lora', weight: 400 },
	{ family: 'Lora', weight: 700 },
];

const crimson = [
	{ family: 'Crimson Text', weight: 400 },
];

const lato = [
	{ family: 'Lato', weight: 400 },
	{ family: 'Lato', weight: 700 },
];

// polyfill promise
if (!window.Promise) window.Promise = Promise;

// load fonts
loadFontGroup(lora);
loadFontGroup(crimson);
loadFontGroup(lato);
