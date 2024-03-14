<script context="module">
	let allVideos = new Set();
	export function getAllVideos() {
		return allVideos;
	}
	export function playAllVideos() {
		allVideos.forEach(video => {
			if (video.paused) {
				video.play();
			}
		});
	}
	export function pauseAllVideos() {
		allVideos.forEach(video => {
			if (!video.paused) {
				video.pause();
			}
		});
	}
	export function allPlaying() {
		return [...allVideos].every(video => !video.paused);
	}
</script>

<script>
	import { onMount, onDestroy } from 'svelte';

	export let src = undefined;

	let paused = true;
	let videoInstance = null;
	const videoId = Symbol();

	onMount(() => {
		allVideos.add(videoInstance);
	});
	onDestroy(() => {
		allVideos.delete(videoInstance);
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<!-- <button on:click={() => console.log(allVideos)}>Videos</button> -->
<video
	bind:this={videoInstance}
	class:playing={!paused}
	src={src}
	controls
	muted
	bind:paused={paused}
></video>

<button
	on:click={() => {
		paused = !paused;
	}}
>
	{paused ? 'Play' : 'Pause'}
</button>

<style>
	video.playing {
		outline: 4px solid red;
	}
</style>
