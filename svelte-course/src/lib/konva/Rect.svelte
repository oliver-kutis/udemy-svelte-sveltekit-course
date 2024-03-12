<script>
	import Konva from 'konva';
	import { layerKey } from './context-keys.js';
	import { getContext, onDestroy } from 'svelte';

	export let x = 20;
	export let y = 20;
	export let width = 100;
	export let height = 100;
	export let fill = 'purple';
	export let stroke = 'black';
	export let strokeWidth = 4;

	const rect = new Konva.Rect({
		x,
		y,
		width,
		height,
		fill,
		stroke,
		strokeWidth,
		...$$restProps,
	});

	$: rect.setAttrs({
		x,
		y,
		width,
		height,
		fill,
		stroke,
		strokeWidth,
		...$$restProps,
	});

	const layer = getContext(layerKey);
	layer.add(rect);

	onDestroy(() => {
		rect.destroy();
	});
</script>
