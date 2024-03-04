import { readable } from 'svelte/store';

const location = readable(null, set => {
	let watchLocationId;
	if (navigator.geolocation && navigator.geolocation.watchPosition) {
		watchLocationId = navigator.geolocation.watchPosition(
			position => {
				const { latitude, longitude } = position.coords;
				set({ latitude, longitude });
			},
			error => {
				set(error);
			},
		);
	}

	return () => {
		// cleanup
		if (navigator.geolocation && navigator.geolocation.clearWatch) {
			navigator.geolocation.clearWatch(watchLocationId);
		}

		set(null);
	};
});

export default location;
