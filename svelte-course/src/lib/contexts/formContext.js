import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';

export function setFormContext(formKey, formObject) {
	let values = writable({ ...formObject });
	setContext(formKey, values);

	return values;
}

export function getFormContext(formKey) {
	return getContext(formKey);
}
