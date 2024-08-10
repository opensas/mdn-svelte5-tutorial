<script>
	import NewTodo from './NewTodo.svelte'
	import FilterButton from './FilterButton.svelte'
	import TodosStatus from './TodosStatus.svelte'
	import Todo from './Todo.svelte'
	import MoreActions from './MoreActions.svelte'

	import { alert } from './alert.svelte.js'
	
	let { 
		todos = $bindable([]) 
	} = $props()

  let filter = $state('all')

	let filtered = $derived(
		filter === 'active' ? todos.filter(t => !t.completed) :
    filter === 'completed' ? todos.filter(t => t.completed) : 
    todos
	)

	let todosStatus                   // reference to TodosStatus instance

  function onremove(todo) {
		todos = todos.filter(t => t.id !== todo.id)
		todosStatus.focus()
		alert.message = `Todo '${todo.name}' has been deleted`
  }

  function onupdate(todo) {
    const i = todos.findIndex(t => t.id === todo.id)
    if (todos[i].name !== todo.name)            alert.message = `todo '${todos[i].name}' has been renamed to '${todo.name}'`
    if (todos[i].completed !== todo.completed)  alert.message = `todo '${todos[i].name}' marked as ${todo.completed ? 'completed' : 'active'}`
    todos[i] = { ...todos[i], ...todo }
  }
	
  function onadd(name) {
		const id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1
    todos.push({ id, name, completed: false })
		alert.message = `Todo '${name}' has been added`
  }

	function oncheckAll(completed) {
		const updated = todos.filter(t => t.completed !== completed).length
		todos.forEach(t => t.completed = completed)
		alert.message = `${completed ? 'Checked' : 'Unchecked'} ${updated} todos`
  }

  function onremoveCompleted() {
		alert.message = `Removed ${todos.filter(t => t.completed).length} completed todos`
		todos = todos.filter(t => !t.completed)
	}
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">

  <!-- NewTodo -->
	<NewTodo autofocus={false} {onadd} />

  <!-- Filter -->
  <FilterButton bind:filter />
	
  <!-- TodosStatus -->
	<TodosStatus bind:this={todosStatus} {todos} />

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
  <MoreActions {todos} {oncheckAll} {onremoveCompleted} />
	
</div>