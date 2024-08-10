// actions.js
export function selectOnFocus(node) {
	if (node && typeof node.select === 'function') {
		// make sure node is defined and has a select() method
		const onFocus = (event) => node.select(); // event handler
		node.addEventListener('focus', onFocus); // when node gets focus call onFocus()
		return {
			destroy: () => node.removeEventListener('focus', onFocus) // this will be executed when the node is removed from the DOM
		};
	}
}

export function onEsc(node, handler) {
	if (node && handler) {
		// make sure node is defined
		const onkeydown = (e) => e.key === 'Escape' && handler(); // event handler
		node.addEventListener('keydown', onkeydown); // when node gets focus call onFocus()
		return {
			destroy: () => node.removeEventListener('keydown', onkeydown) // this will be executed when the node is removed from the DOM
		};
	}
}
