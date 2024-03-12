<script>
	import Konva from 'konva';
	import { stageKey } from './context-keys.js';
	import { onMount, onDestroy, setContext } from 'svelte';
	import { setKonvaStage } from '../contexts/konvaContext.js';

	export let width = 500;
	export let height = 500;
	let container;
	let stage;

	$: if (stage) stage.setAttrs({ width, height, ...$$restProps });
	// setKonvaStage(stageKey, stage);
	setContext(stageKey, {
		getStage: () => stage,
	});

	onMount(() => {
		stage = new Konva.Stage({
			container: container,
			width: width,
			height: height,
			...$$restProps,
		});
	});

	onDestroy(() => {
		if (stage) stage.destroy();
	});
</script>

<div bind:this={container}>
	{#if stage}
		<slot />
	{/if}
</div>
