<script>
	import { Stage, Layer, Rect } from '../konva';
	let showCanvas = true;
	let x = 20;
	let width = 200;
</script>

<label>
	<input type="checkbox" bind:checked={showCanvas} />
	Show Canvas
</label>
<label>
	<input type="range" bind:value={x} min="20" max="500" />
	Change X position
</label>
<label>
	<input type="range" bind:value={width} min="20" max="700" />
	Change width
</label>
<Stage width={width} height={500}>
	{#if showCanvas}
		<Layer
			draggable={true}
			x={x}
			on:dragmove={e => console.log(e.detail)}
			on:click={e => console.log(e.detail)}
		>
			<Rect
				x={x}
				y={20}
				fill="blue"
				width={200}
				height={100}
				stroke="black"
				strokeWidth={1}
				shadowColor="black"
				shadowBlur={10}
			></Rect>
			<Rect
				x={50}
				y={50}
				fill="pink"
				width={200}
				height={100}
				stroke="black"
				strokeWidth={1}
			></Rect>
		</Layer>
	{/if}
	<Layer>
		<Rect
			x={300}
			y={100}
			fill="green"
			width={200}
			height={100}
			stroke="black"
			strokeWidth={2}
		></Rect>
	</Layer>
</Stage>
