<script>
	import Alert from '$lib/components/alert/';
	import Todos from '$lib/components/todos/';

	let todos = $state([
		{ id: 1, name: 'Create a Svelte starter app', completed: true },
		{ id: 2, name: 'Create your first component', completed: true },
		{ id: 3, name: 'Complete the rest of the tutorial', completed: false }
	]);
</script>

<Alert />
<Todos bind:todos />
