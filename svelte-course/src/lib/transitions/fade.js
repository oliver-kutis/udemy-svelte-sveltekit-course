import { cubicInOut } from 'svelte/easing';

export default function fade(
	node,
	{ delay = 100, duration = 500, easing = cubicInOut },
) {
	const style = getComputedStyle(node);
	const origOpacity = +style.opacity;

	return {
		delay,
		duration,
		easing,
		tick: t => {
			node.style.opacity = t * origOpacity;
		},
	};
}
