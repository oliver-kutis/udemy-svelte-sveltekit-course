<script>
	import { onMount } from 'svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import tippyAction from './lib/actions/tippy.js';

	let button;
	let content = 'Hello';

	onMount(() => {
		tippy('.tooltip', {
			content: 'I am a tooltip',
		});
		tippy(button, {
			content: 'I am a tooltip',
		});
	});
</script>

<!-- <button class="tooltip">Button</button>
<button class="tooltip" data-tippy-content="Some other text">Button</button>
<button bind:this={button}>Button</button> -->
<input bind:value={content} type="text" />
<button use:tippyAction={{ content: content, theme: 'light' }}
	>Action - Tippy</button
>

<style>
</style>
