import { derived } from 'svelte/store';
import settings from './settings.js';

const direction = derived(
	settings,
	($settings, set, update) => {
		// just to simulate an async operation
		const timer = setTimeout(() => {
			set($settings.language === 'ar' ? 'rtl' : 'ltr');
		}, 400);

		return () => clearTimeout(timer);
	},
	'not decided yet', // initial value
);

export default direction;
