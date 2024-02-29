import { cubicInOut } from 'svelte/easing';

export default function spin(
	node,
	{ delay = 200, duration = 1000, easing = cubicInOut, spin = 1 },
) {
	const style = getComputedStyle(node);
	const originalOpacity = +getComputedStyle(node).opacity;
	const originalTransform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing,
		css: t => {
			return `
        opacity: ${t * originalOpacity};
        transform: ${originalTransform} scale(${t}) rotate(${spin * 360 * t}deg);
      `;
		},
	};
}
