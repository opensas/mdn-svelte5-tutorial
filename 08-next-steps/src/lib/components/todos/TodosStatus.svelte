<!-- TodosStatus.svelte -->
<script lang="ts">
	import type { Todo } from '.';

	type Props = { todos: Todo[] };

	let { todos = [] }: Props = $props();

	let total = $derived(todos.length);
	let completed = $derived(todos.filter((todo) => todo.completed).length);

	let headingEl: HTMLHeadElement;

	export const focus = () => headingEl.focus();
</script>

<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
	{completed} out of {total} items completed
</h2>
