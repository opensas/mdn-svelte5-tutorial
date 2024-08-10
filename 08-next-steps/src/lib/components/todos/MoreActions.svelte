<!-- MoreActions.svelte -->
<script lang="ts">
	import type { Todo } from '.';

	type Props = {
		todos: Todo[];
		onremoveCompleted: () => void;
		oncheckAll: (value: boolean) => void;
	};

	let { todos = [], onremoveCompleted = () => {}, oncheckAll = () => {} }: Props = $props();

	function updateAll() {
		oncheckAll(action === 'check' ? true : false);
	}

	function removeCompleted() {
		onremoveCompleted();
	}

	let completedTodos = $derived(todos.filter((t) => t.completed).length);
	let allCompleted = $derived(completedTodos === todos.length);

	let action = $derived(allCompleted ? 'uncheck' : 'check');
</script>

<div class="btn-group">
	<button type="button" class="btn btn__primary" disabled={todos.length === 0} onclick={updateAll}>
		{action} all
	</button>
	<button
		type="button"
		class="btn btn__primary"
		disabled={completedTodos === 0}
		onclick={removeCompleted}
	>
		Remove completed
	</button>
</div>
