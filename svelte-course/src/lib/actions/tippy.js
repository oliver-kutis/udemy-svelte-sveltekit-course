import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

export default function tippyAction(node, options = {}) {
	const instance = tippy(node, options);
	console.log(instance);
	return {
		update(newOptions) {
			instance.setProps(newOptions);
		},
		destroy() {
			instance.destroy();
		},
	};
}
