<script>
	import { onMount, onDestroy, setContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Konva from 'konva';
	import { stageKey, layerKey } from './context-keys.js';
	import { getKonvaStage } from '../contexts/konvaContext.js';

	export let draggable = undefined;
	let layer;
	const dispatch = createEventDispatcher();
	const { getStage } = getKonvaStage(stageKey);
	const stage = getStage();

	$: if (layer) layer.setAttrs({ draggable, ...$$restProps });
	layer = new Konva.Layer({
		draggable,
		...$$restProps,
	});
	setContext(layerKey, layer);

	layer.on('dragmove click', e => {
		dispatch(e.type, e);
	});
	stage.add(layer);

	onDestroy(() => {
		if (layer) layer.destroy();
	});
</script>

<slot />
