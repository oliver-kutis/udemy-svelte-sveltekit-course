<script context="module">
	let buttonCount = 0;

	export const getButtonCount = () => buttonCount;
	export const incrementButtonCount = buttonCount => {
		buttonCount++;
		return buttonCount;
	};
</script>

<script>
	import { onDestroy, onMount } from 'svelte';

	export let size = '';
	export let shadow = false;
	export let bgColor = 'inherit';
	export let textColor = 'inherit';

	let isLeftHovered;
	onMount(() => {
		buttonCount++;
	});
	onDestroy(() => {
		buttonCount--;
	});

	buttonCount++;
</script>

<p>{buttonCount}</p>
<button
	on:click
	style:--buttonBgColor={bgColor}
	style:--buttonTextColor={textColor}
	class:size-lg={size === 'large'}
	class:size-sm={size === 'small'}
	class:has-left={$$slots.leftContent}
	class:shadow={shadow}
	{...$$restProps}
>
	{#if $$slots.leftContent}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="left-content"
			on:mouseenter={() => (isLeftHovered = true)}
			on:mouseleave={() => (isLeftHovered = false)}
		>
			<slot name="leftContent" isLeftHovered={isLeftHovered} />
		</div>
	{/if}
	<slot>Fallback</slot>
</button>

<style lang="scss">
	button {
		display: flex;
		border: none;
		background-color: var(--buttonBgColor);
		align-items: center;
		color: var(--buttonTextColor);
		font-weight: bold;
		border-radius: 5px;
		cursor: pointer;
		.left-content {
			margin-right: 10px;
		}
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
		&:hover {
			background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
		}
		&:active {
			background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
		}
		&.size-sm {
			padding: 8px 12px;
			font-size: 14px;
		}
		&.size-lg {
			padding: 20px 25px;
			font-size: 20px;
		}
		&.shadow {
			box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
		}
	}
</style>
