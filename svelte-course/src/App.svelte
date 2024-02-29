<script>
	import ToDoList from './lib/ToDoList.svelte';
	import { tick, onMount } from 'svelte';
	import { v4 as uuid } from 'uuid';
	import { fly } from 'svelte/transition';
	import spin from './lib/transitions/spin.js';
	import fade from './lib/transitions/fade.js';

	let todolist;
	let showList = true;

	let todos = null;
	let errorTodos = null;
	let isLoading = false;
	let isAdding;
	let isToggling = false;

	// $: console.log(todos);

	onMount(() => {
		loadTodos();
	});

	async function makeRequest(url, options, errorMessage) {
		try {
			const res = await fetch(url, options);
			if (!res.ok) {
				errorTodos = errorMessage;
				throw new Error(errorMessage);
			}

			return res.json();
		} catch (error) {
			errorTodos = errorMessage;
			throw new Error(errorMessage);
		}
	}

	async function loadTodos() {
		isLoading = true;
		const errorMessage = '🚨 Failed to load todos';
		try {
			todos = await makeRequest(
				'https://jsonplaceholder.typicode.com/todos?_limit=10',
				{},
				errorMessage,
			);
		} catch (error) {
			errorTodos = errorMessage;
		}
		// try {
		// 	const res = await fetch(
		// 		'https://jsonplaceholder.typicode.com/todos?_limit=10',
		// 	);
		// 	if (!res.ok) {
		// 		errorTodos = '🚨 Failed to load todos';
		// 	}
		// 	// return res.json();
		// 	todos = await res.json();
		// } catch (error) {
		// 	errorTodos = '🚨 Failed to load todos';
		// }
		isLoading = false;
	}
	// let todos = [
	// 	{ id: uuid(), title: 'Learn Svelte' },
	// 	{ id: uuid(), title: 'Create a Svelte app' },
	// 	{ id: uuid(), title: 'Master Svelte' },
	// 	{
	// 		id: uuid(),
	// 		title: 'Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long ',
	// 	},
	// ];

	async function handleAddTodo(e) {
		e.preventDefault();
		isAdding = true;
		const errorMessage = '🚨 Failed to add todo';
		let todoItem;
		try {
			// 	const res = await fetch(
			// 		'https://jsonplaceholder.typicode.com/todos',
			// 		{
			// 			method: 'POST',
			// 			body: JSON.stringify({ id: uuid(), title: e.detail.title }),
			// 			headers: {
			// 				'Content-type': 'application/json; charset=UTF-8',
			// 			},
			// 		},
			// 	);
			// 	if (!res.ok) {
			// 		errorTodos = '🚨 Failed to add todo';
			// 	}
			todoItem = await makeRequest(
				'https://jsonplaceholder.typicode.com/todos',
				{
					method: 'POST',
					body: JSON.stringify({ id: uuid(), title: e.detail.title }),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				},
				errorMessage,
			);
			todos = [{ ...todoItem, id: uuid() }, ...todos];
		} catch (error) {
			errorTodos = errorMessage;
		}

		// we can leverage the read-only function to clear the input
		todolist.clearInput();
		isAdding = false;
		await tick();
		todolist.focusInput();
	}
	async function handleRemoveTodo(e) {
		const errorMessage = '🚨 Failed to remove todo';
		try {
			const todoToRemove = todos.find(todo => todo.id === e.detail.id);
			todoToRemove.removed = e.detail.removed;

			await tick();

			await makeRequest(
				`https://jsonplaceholder.typicode.com/todos/${e.detail.id}`,
				{
					method: 'DELETE',
				},
				errorMessage,
			);

			todos = todos.filter(todo => todo.id !== e.detail.id);
		} catch (error) {
			errorTodos = errorMessage;
		}
	}

	async function handleToggleTodo(e) {
		isToggling = true;
		const todo = await makeRequest(
			`https://jsonplaceholder.typicode.com/todos/${e.detail.id}`,
			{
				method: 'PATCH',
				body: JSON.stringify({ completed: e.detail.completed }),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			},
			'🚨 Failed to toggle todo',
		);
		todos = todos.map(item => {
			if (item.id === e.detail.id) {
				item.completed = e.detail.completed;
			}

			return item;
		});
		isToggling = false;
	}
</script>

<label style="margin-bottom:10px; display:block;">
	<input type="checkbox" bind:checked={showList} />
	Show/Hide List
</label>
{#if showList}
	<!-- {#await loadTodos() then todos} -->
	<!-- {#await promise}
		<p>Loading todos...</p>
	{:then todos} -->
	<div
		transition:fade={{ duration: 1000 }}
		style:max-width="800px"
		style:display="flex"
	>
		<!-- <p>{isLoading}</p>
		<p>{errorTodos}</p> -->
		<ToDoList
			isLoading={isLoading}
			isAdding={isAdding}
			isToggling={isToggling}
			errorTodos={errorTodos}
			todos={todos}
			scrollOnAdd={'top'}
			bind:this={todolist}
			on:addTodo={handleAddTodo}
			on:removeTodo={handleRemoveTodo}
			on:toggleTodo={handleToggleTodo}
		>
			<h3 slot="title" style="text-aling: center;">
				Your Todo List
			</h3></ToDoList
		>
	</div>
	{#if todos}
		<p>
			Number of todos: {#key todos.length}<span
					in:fly|local={{
						// delay: 1000,
						duration: 500,
						// x: 0,
						y: -20,
					}}
					style="display: inline-block;">{todos.length}</span
				>{/key}
		</p>
	{/if}
	<!-- {:catch error}
		{(console.log(error), '')}
		<p>{error.message}</p>
	{/await}
	<button on:click={() => (promise = loadTodos())}>Refresh</button> -->
{/if}

<style>
</style>
