<script>
	import FilterButton from './FilterButton.svelte'
	import Todo from '$lib/components/Todo.svelte'
	
	let { 
		todos = $bindable([]) 
	} = $props()
	
  let newTodoName = $state('')

  let totalTodos = $derived(todos.length)
  let completedTodos = $derived(todos.filter(todo => todo.completed).length)

  let filter = $state('all')

	let filtered = $derived(
		filter === 'active' ? todos.filter(t => !t.completed) :
    filter === 'completed' ? todos.filter(t => t.completed) : 
    todos
	)
	
  function onremove(todo) {
    todos = todos.filter(t => t.id !== todo.id)
  }

  function onupdate(todo) {
    const i = todos.findIndex(t => t.id === todo.id)
    todos[i] = { ...todos[i], ...todo }
  }
	
  function addTodo(e) {
		e.preventDefault()
		const id = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1
    todos.push({ id, name: newTodoName, completed: false })
    newTodoName = ''
  }
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">

  <!-- NewTodo -->
  <form onsubmit={addTodo}>
    <h2 class="label-wrapper">
      <label for="todo-0" class="label__lg">
        What needs to be done?
      </label>
    </h2>
    <input bind:value={newTodoName} type="text" id="todo-0" autocomplete="off" class="input input__lg" />
    <button type="submit" class="btn btn__primary btn__lg">
      Add
    </button>
  </form>

  <!-- Filter -->
  <FilterButton bind:filter />
	
  <!-- TodosStatus -->
  <h2 id="list-heading">{completedTodos} out of {totalTodos} items completed</h2>

  <!-- Todos -->
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
	  {#each filtered as todo (todo.id)}
	    <li class="todo">
	      <Todo {todo} {onupdate} {onremove} />
	    </li>
	  {:else}
	    <li>Nothing to do here!</li>
	  {/each}
  </ul>
	
  <hr />

  <!-- MoreActions -->
  <div class="btn-group">
    <button type="button" class="btn btn__primary">Check all</button>
    <button type="button" class="btn btn__primary">Remove completed</button>
  </div>

</div>