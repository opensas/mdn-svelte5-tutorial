<!-- Todo.svelte -->
<script>
	let {
		todo = $bindable(),
		onupdate = () => {},
		onremove = () => {},
	} = $props()

  let editing = $state(false)             // track editing mode
  let name = $state(todo.name)            // hold the name of the todo being edited

  function update(updatedTodo) {
    todo = { ...todo, ...updatedTodo }    // applies modifications to todo
    onupdate(todo)                        // emit update event
  }

  function cancel() {
    name = todo.name                      // restores name to its initial value and
    editing = false                       // and exit editing mode
  }

  function save(e) {
		e.preventDefault()
    update({ name })                      // updates todo name
    editing = false                       // and exit editing mode
  }

  function remove() {
    onremove(todo)                        // emit remove event
  }

  function edit() {
    editing = true                        // enter editing mode
  }

  function toggle() {
    update({ completed: !todo.completed}) // updates todo status
  }

	function handleEsc(e) {
		if (e.key === 'Escape') cancel()
	}
</script>

<div class="stack-small">
{#if editing}
  <!-- markup for editing todo: label, input text, Cancel and Save Button -->
  <form onsubmit={save} class="stack-small">
    <div class="form-group">
      <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
      <input bind:value={name} type="text" id="todo-{todo.id}" autoComplete="off" class="todo-text" onkeydown={handleEsc} />
    </div>
    <div class="btn-group">
      <button class="btn todo-cancel" onclick={cancel} type="button" onkeydown={handleEsc}>
        Cancel<span class="visually-hidden">renaming {todo.name}</span>
        </button>
      <button class="btn btn__primary todo-edit" type="submit" disabled={!name} onkeydown={handleEsc}>
        Save<span class="visually-hidden">new name for {todo.name}</span>
      </button>
    </div>
  </form>
{:else}
  <!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
  <div class="c-cb">
    <input type="checkbox" id="todo-{todo.id}"
      onclick={toggle} checked={todo.completed}
    >
    <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
  </div>
  <div class="btn-group">
    <button type="button" class="btn" onclick={edit}>
      Edit<span class="visually-hidden"> {todo.name}</span>
    </button>
    <button type="button" class="btn btn__danger" onclick={remove}>
      Delete<span class="visually-hidden"> {todo.name}</span>
    </button>
  </div>
{/if}
</div>
