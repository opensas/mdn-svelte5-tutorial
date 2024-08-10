<!-- FilterButton.svelte -->
<script>
  let {
		filter = $bindable('all')
	} = $props()
</script>

<div class="filters btn-group stack-exception">
  <button class="btn toggle-btn" class:btn__primary={filter === 'all'} aria-pressed={filter === 'all'} onclick={()=> filter = 'all'} >
    <span class="visually-hidden">Show</span>
    <span>All</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button class="btn toggle-btn" class:btn__primary={filter === 'active'} aria-pressed={filter === 'active'} onclick={()=> filter = 'active'} >
    <span class="visually-hidden">Show</span>
    <span>Active</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button class="btn toggle-btn" class:btn__primary={filter === 'completed'} aria-pressed={filter === 'completed'} onclick={()=> filter = 'completed'} >
    <span class="visually-hidden">Show</span>
    <span>Completed</span>
    <span class="visually-hidden">tasks</span>
  </button>
</div>