<svelte:options immutable={true} />

<script>
	// Imports
	import Button from './Button.svelte';
	import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';
	import { afterUpdate, createEventDispatcher } from 'svelte';
	// import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { crossfade, scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	// import fade from './transitions/fade.js';

	const [send, receive] = crossfade({
		delay: 0,
		duration: 300,
		fallback: node => scale(node, { start: 0.5, duration: 300 }),
		// easing: cubicInOut,
	});

	// function move(item, from, to) {
	// 	to.push(item);
	// 	return [from.filter(i => i !== item), to];
	// }

	// function moveLeft(item) {
	// 	console.log(item, right, left);
	// 	[right, left] = move(item, right, left);
	// }

	// function moveRight(item) {
	// 	console.log(item);
	// 	[left, right] = move(item, left, right);
	// }

	// Exports
	export let todos = null;
	let doneTodos;
	let notDoneTodos;

	$: {
		doneTodos = todos ? todos.filter(todo => todo.completed) : [];
		notDoneTodos = todos ? todos.filter(todo => !todo.completed) : [];
	}

	export let errorTodos = null;
	export let isLoading = false;
	export let isAdding;
	// export let isRemoving = false;
	export let isToggling = false;
	export let scrollOnAdd = undefined;

	export function clearInput() {
		inputText = '';
	}
	export function focusInput() {
		input.focus();
	}

	// Variables
	const dispatch = createEventDispatcher();
	let prevTodos = todos;
	$: {
		// the `todos` array is updated but prevTodos is not updated ...
		//	... (has the value of the previous `todos` array)
		autoscroll =
			todos && prevTodos ? todos.length > prevTodos.length : false;
		prevTodos = todos; // ... so, we update the prevTodos to the current value of `todos`
	}

	// $: console.log(todos);
	// $: if (success) {
	// 	setTimeout(() => {
	// 		success = false;
	// 	}, 3000);
	// }

	let input;
	let inputText = '';
	let inputElement, listDiv, divWrapper, autoscroll, listDivScrollHeight;

	// Watchers
	afterUpdate(() => {
		if (autoscroll) {
			if (scrollOnAdd === 'top') {
				listDiv.scrollTo(0, 0);
			} else if (scrollOnAdd === 'bottom') {
				listDiv.scrollTo(0, listDiv.scrollHeight);
			}

			autoscroll = false;
			// const p = document.createElement('p');
			// p.textContent = 'Successfully added new todo!';
			// divWrapper.appendChild(p);
		}
	});

	// Functions
	function dispatchAddTodo() {
		const isNotCancelled = dispatch(
			'addTodo',
			{ title: inputText },
			{ cancelable: true },
		);

		if (isNotCancelled) {
			inputText = '';
		}
	}
	function dispatchRemoveTodo(id) {
		dispatch('removeTodo', { id: id, removed: true }, { cancelable: true });
	}
	function dispatchToggleTodo(id, completed) {
		dispatch('toggleTodo', { id: id, completed: completed });
	}
</script>

<div bind:this={divWrapper} class="todo-list-wrapper">
	<!-- {@debug isLoading, errorTodos, todos} -->
	<slot name="title">Todos</slot>
	{#if isLoading}
		<p class="state-text">Loading todos...</p>
	{:else if errorTodos}
		<p class="state-text">{errorTodos}</p>
		<!-- {/if} -->
	{:else if todos}
		<div
			bind:this={listDiv}
			class="todo-list"
			style="scroll-behavior: smooth;"
		>
			<div bind:offsetHeight={listDivScrollHeight}>
				{#if todos.length === 0}
					<!-- {console.log(todos)} -->
					<p class="state-text">No todos to display</p>
				{:else}
					<div style:display="flex">
						{#each [notDoneTodos, doneTodos] as list, index}
							<div class="list-wrapper">
								<h2>{index === 0 ? 'todo' : 'done'}</h2>
								<ul>
									{#each list as todo (todo.id)}
										<li animate:flip={{ duration: 300 }}>
											<div
												class:completed={todo.completed}
												in:receive|local={{
													key: todo.id,
												}}
												out:send|local={{
													key: todo.id,
												}}
											>
												<label>
													<input
														type="checkbox"
														checked={todo.completed}
														disabled={isToggling ||
															todo.removed}
														on:change={() =>
															dispatchToggleTodo(
																todo.id,
																!todo.completed,
															)}
													/>
													{todo.title}
												</label>
												<button
													disabled={isToggling ||
														todo.removed}
													class="remove-todo-button"
													aria-label="Remove todo: {todo.title}"
													on:click={() =>
														dispatchRemoveTodo(
															todo.id,
														)}
												>
													<span
														style:width="10px"
														style:display="inline-block"
													>
														<FaRegTrashAlt />
													</span>
												</button>
											</div>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<!-- {/if} -->
	<form class="add-todo-form" on:submit|preventDefault={dispatchAddTodo}>
		<input
			bind:this={input}
			bind:value={inputText}
			disabled={isAdding || !todos}
			type="text"
			placeholder="New Todo"
		/>
		<Button
			class="add-todo-button"
			type="submit"
			disabled={!inputText || isAdding || !todos}>Add</Button
		>
	</form>
</div>

<!-- {#if isAdding === false}
	<p>Success!</p>
{/if} -->

<!-- {#if action === 'addTodo'}
	{#if isLoading}
		<p>Posting new todo...</p>
	{:else if errorTodos}
		<p>{errorTodos}</p>
	{:else}
		<p>Successfully added new todo!</p>
	{/if}
{/if} -->

<style lang="scss">
	.todo-list-wrapper {
		background-color: #424242;
		border: 1px solid #4b4b4b;
		:global(h3) {
			text-align: center;
		}
		.state-text {
			margin: 0;
			padding: 15px;
			text-align: center;
		}
		.todo-list {
			max-height: 400px;
			overflow: auto;
			.list-wrapper {
				// margin: 0 5px;
				padding: 5px;
				flex: 1;
				// text-align: center;
				h2 {
					// background-color: #7d7c7c;
					margin: 0;
					padding: 10px;
					color: var(--buttonBgColor);
					font-style: italic;
					border-radius: 5px;
				}
			}
			ul {
				margin: 0;
				padding: 10px;
				list-style: none;
				li > div {
					margin-bottom: 5px;
					display: flex;
					align-items: center;
					background-color: #303030;
					border-radius: 5px;
					padding: 10px;
					position: relative;
					label {
						cursor: pointer;
						font-size: 18px;
						display: flex;
						align-items: baseline;
						padding-right: 20px;
						input[type='checkbox'] {
							margin: 0 10px 0 0;
							cursor: pointer;
						}
					}
					&.completed > label {
						opacity: 0.5;
						text-decoration: line-through;
					}
					.remove-todo-button {
						border: none;
						background: none;
						padding: 5px;
						position: absolute;
						right: 10px;
						cursor: pointer;
						display: none;
						:global(svg) {
							fill: #bd1414;
						}
					}
					&:hover {
						.remove-todo-button {
							display: block;
						}
					}
				}
			}
		}
		.add-todo-form {
			padding: 15px;
			background-color: #303030;
			display: flex;
			flex-wrap: wrap;
			border-top: 1px solid #4b4b4b;
			// :global(.add-todo-button) {
			//   background-color: aqua;
			// }
			input {
				flex: 1;
				background-color: #424242;
				border: 1px solid #4b4b4b;
				padding: 10px;
				color: #fff;
				border-radius: 5px;
				margin-right: 10px;
			}
		}
	}
</style>
