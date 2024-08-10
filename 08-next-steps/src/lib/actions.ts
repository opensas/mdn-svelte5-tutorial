// actions.ts
type Handler = () => void;

export function selectOnFocus(node: HTMLElement & { select: Handler }) {
	if (node && typeof node.select === 'function') {
		// make sure node is defined and has a select() method
		const onFocus = () => node.select(); // event handler
		node.addEventListener('focus', onFocus); // when node gets focus call onFocus()
		return {
			destroy: () => node.removeEventListener('focus', onFocus) // this will be executed when the node is removed from the DOM
		};
	}
}

export function onEsc(node: HTMLElement, handler?: Handler) {
	if (node && handler) {
		// make sure node is defined
		const onkeydown = (e: KeyboardEvent) => e.key === 'Escape' && handler(); // event handler
		node.addEventListener('keydown', onkeydown); // when node gets focus call onFocus()
		return {
			destroy: () => node.removeEventListener('keydown', onkeydown) // this will be executed when the node is removed from the DOM
		};
	}
}
