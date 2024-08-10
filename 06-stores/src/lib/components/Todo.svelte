<!-- Todo.svelte -->
<script>
	import { selectOnFocus, onEsc } from './actions.js'
	
	let {
		todo = $bindable(),
		onupdate = () => {},
		onremove = () => {},
	} = $props()

	let name = $state(todo.name)            // hold the name of the todo being edited
	
  let editing = $state(false)             // track editing mode
	let editButtonPressed = $state(false)   // track if edit button has been pressed, to give focus to it after cancel or save

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
    editButtonPressed = true              // when Cancel or Save is pressed, focus should go back to the Edit button
  }

  function toggle() {
    update({ completed: !todo.completed}) // updates todo status
  }

	const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus()

  const focusEditButton = (node) => editButtonPressed && node.focus()
</script>

<div class="stack-small">
{#if editing}
  <!-- markup for editing todo: label, input text, Cancel and Save Button -->
  <form onsubmit={save} class="stack-small" use:onEsc={cancel} >
    <div class="form-group">
      <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
      <input bind:value={name} type="text" use:selectOnFocus use:focusOnInit id="todo-{todo.id}" autoComplete="off" class="todo-text" />
    </div>
    <div class="btn-group">
      <button class="btn todo-cancel" onclick={cancel} type="button" >
        Cancel<span class="visually-hidden">renaming {todo.name}</span>
      </button>
      <button class="btn btn__primary todo-edit" type="submit" disabled={!name} >
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
    <button type="button" class="btn" onclick={edit} use:focusEditButton>
      Edit<span class="visually-hidden"> {todo.name}</span>
    </button>
    <button type="button" class="btn btn__danger" onclick={remove}>
      Delete<span class="visually-hidden"> {todo.name}</span>
    </button>
  </div>
{/if}
</div>
