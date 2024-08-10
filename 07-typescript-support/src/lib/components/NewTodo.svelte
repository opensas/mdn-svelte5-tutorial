<!-- NewTodo.svelte -->
<script>
  import { onMount } from 'svelte'

  import { selectOnFocus, onEsc } from './actions.js'

  let {
		autofocus = false,
		onadd = () => {},
	} = $props()

  let name = $state('')
  let nameEl                  // reference to the name input DOM node

  function add(e) {
		e.preventDefault()
    onadd(name)
		clear()
  }

  function clear() {
    name = ''
    nameEl.focus()            // give focus to the name input
  }
	
  onMount(() => autofocus && nameEl.focus())    // if autofocus is true, we run nameEl.focus()

</script>

<form onsubmit={add} use:onEsc={clear} >
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg">What needs to be done?</label>
  </h2>
  <input bind:value={name} bind:this={nameEl} use:selectOnFocus 
    type="text" id="todo-0" autoComplete="off" class="input input__lg" 
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg">Add</button>
</form>