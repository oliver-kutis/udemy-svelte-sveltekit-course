import { writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';

export function setKonvaStage(key, value) {
	if (!value) return;
	const valueStore = writable(value);
	setContext(key, valueStore);
	return valueStore;
}

export function getKonvaStage(key) {
	return getContext(key);
}
