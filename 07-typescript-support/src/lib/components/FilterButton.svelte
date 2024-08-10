<!-- FilterButton.svelte -->
<script>
  let {
		filter = $bindable('all')
	} = $props()
</script>

<div class="filters btn-group stack-exception">
	{@render button('all')}
	{@render button('active')}
	{@render button('completed')}
</div>

{#snippet button(status)}
	{@const active = filter === status }
  <button class="btn toggle-btn" class:btn__primary={active} aria-pressed={active} onclick={()=> filter = status} >
    <span class="visually-hidden">Show</span>
    <span>{status}</span>
    <span class="visually-hidden">tasks</span>
  </button>
{/snippet}