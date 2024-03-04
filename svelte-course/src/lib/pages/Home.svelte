<script>
	import { spring } from 'svelte/motion';

	let boxProps = spring(
		{
			width: 100,
			height: 100,
		},
		{
			stiffness: 0.2,
			damping: 0.4,
		},
	);
</script>

<button
	on:click={async () => {
		await boxProps.set({
			width: Math.random() * 500,
			height: Math.random() * 500,
		});
		console.log('done');
	}}
>
	Random boxProps</button
>
<div
	style:width="{$boxProps.width}px"
	style:height="{$boxProps.height}px"
	style:background-color="purple"
	style:transform-origin="0 0"
></div>
<!-- <h2>Home</h2> -->
<!-- {#if $location instanceof GeolocationPositionError}
	<p>{$location.message}</p>
{:else if $location}
	<p>Your latitude: {$location.latitude}</p>
	<p>Your longitude: {$location.longitude}</p>
{:else}
	<p>Fetching location...</p>
{/if} -->
