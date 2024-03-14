<script>
	import VideoPlayer, {
		playAllVideos,
		pauseAllVideos,
		allPlaying,
		getAllVideos,
	} from '../VideoPlayer.svelte';
</script>

<button on:click={playAllVideos}>Play all videos</button>
<button on:click={pauseAllVideos}>Pause all videos</button>

<!-- <button on:click={playAllVideos()}
	>{allPlaying() ? 'Pause' : 'Play'} all videos</button
> -->
<VideoPlayer src="mov_bbb.mp4" />
<VideoPlayer src="mov_bbb.mp4" />
<VideoPlayer src="mov_bbb.mp4" />
