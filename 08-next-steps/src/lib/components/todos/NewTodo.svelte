<!-- NewTodo.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	import { selectOnFocus, onEsc } from '$lib/actions';

	type Props = {
		autofocus: boolean;
		onadd: (name: string) => void;
	};
	let { autofocus = false, onadd = () => {} }: Props = $props();

	let name = $state('');
	let nameEl: HTMLInputElement; // reference to the name input DOM node

	function add(e: Event) {
		e.preventDefault();
		onadd(name);
		clear();
	}

	function clear() {
		name = '';
		nameEl.focus(); // give focus to the name input
	}

	onMount(() => {
		if (autofocus) nameEl.focus();
	}); // if autofocus is true, we run nameEl.focus()
</script>

<form onsubmit={add} use:onEsc={clear}>
	<h2 class="label-wrapper">
		<label for="todo-0" class="label__lg">What needs to be done?</label>
	</h2>
	<input
		bind:value={name}
		bind:this={nameEl}
		use:selectOnFocus
		type="text"
		id="todo-0"
		autoComplete="off"
		class="input input__lg"
	/>
	<button type="submit" disabled={!name} class="btn btn__primary btn__lg">Add</button>
</form>
