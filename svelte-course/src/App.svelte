<script>
	import { onMount } from 'svelte';
	import Home from './lib/pages/Home.svelte';
	import Settings from './lib/pages/Settings.svelte';
	import Head from './lib/Head.svelte';
	import direction from './lib/stores/direction';
	// import location from './lib/stores/location.js';

	let location;
	function onRouteChange() {
		location = window.location.hash.slice(1) || '/';
	}
	onMount(() => {
		onRouteChange();
		document.body.dir = $direction;
	});

	$: document.body.dir = $direction;
	$: console.log($direction);
</script>

<svelte:body dir={$direction} />
<svelte:window on:hashchange={onRouteChange} />
<nav>
	<ul>
		<li><a href="#/">Home</a></li>
		<li><a href="#/settings">Settings</a></li>
	</ul>
</nav>

<Head />

{#if location === '/'}
	<Home />
{:else if location === '/settings'}
	<Settings />
{:else}
	{((window.location.hash = '/'), '')}
{/if}

<style>
</style>
