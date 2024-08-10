<!-- TodosStatus.svelte -->
<script>
  let {
		todos = []
	} = $props()

  let total = $derived(todos.length)
  let completed = $derived(todos.filter(todo => todo.completed).length)

  let headingEl

  export const focus = () => headingEl.focus()
</script>

<h2 id="list-heading" bind:this={headingEl} tabindex="-1">{completed} out of {total} items completed</h2>