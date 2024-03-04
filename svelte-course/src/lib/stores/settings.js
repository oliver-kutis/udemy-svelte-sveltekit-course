import { writable } from 'svelte/store';

const defaultSettings = {
	colorScheme: 'light',
	language: 'en',
	fontSize: 12,
};

function createSettignsStore() {
	let settingsStore = writable({ ...defaultSettings });
	const { subscribe, set, update } = settingsStore;

	return {
		subscribe,
		set,
		update,
		updateSetting: (setting, value) => {
			update(settings => ({ ...settings, [setting]: value }));
		},
		toggleColorScheme: () => {
			update(settings => ({
				...settings,
				colorScheme:
					settings.colorScheme === 'light' ? 'dark' : 'light',
			}));
		},
		reset: () => {
			set({ ...defaultSettings });
		},
	};
}

// export default settings;
export default createSettignsStore();
