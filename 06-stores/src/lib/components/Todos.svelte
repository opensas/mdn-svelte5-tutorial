<script>
	import NewTodo from './NewTodo.svelte'
	import FilterButton from './FilterButton.svelte'
	import TodosStatus from './TodosStatus.svelte'
	import Todo from './Todo.svelte'
	import MoreActions from './MoreActions.svelte'
	
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
  }

  function onupdate(todo) {
    const i = todos.findIndex(t => t.id === todo.id)
    todos[i] = { ...todos[i], ...todo }
  }
	
  function onadd(name) {
		const id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1
    todos.push({ id, name, completed: false })
  }

	function oncheckAll(completed) {
		todos.forEach(t => t.completed = completed)
  }

  function onremoveCompleted() {
		todos = todos.filter(t => !t.completed)
	}
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">

  <!-- NewTodo -->
	<NewTodo autofocus {onadd} />

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