<script>
	// import { setContext } from 'svelte';
	import { createEventDispatcher, hasContext } from 'svelte';
	import { setFormContext, getFormContext } from '../contexts/formContext.js';
	import formKey from './form-key.js';

	export let initialValues = {};
	// export let validate = undefined;

	const dispatch = createEventDispatcher();

	let submitted = false;
	let formContext = getFormContext(formKey);

	if (!formContext) {
		setFormContext(formKey, {
			values: { ...initialValues },
			errors: {
				options: { display: false },
			},
		});

		formContext = getFormContext(formKey);
	}
</script>

<pre>
	{JSON.stringify($formContext, null, 2)}
</pre>

{#if submitted}
	<p>Form submitted successfully!</p>
{/if}
<form
	on:submit|preventDefault={() => {
		if (
			$formContext.errors &&
			Object.keys($formContext.errors).length > 1
		) {
			$formContext.errors.options.display = true;
			return;
		}

		dispatch('submit', $formContext.values);
		submitted = true;
		$formContext.values = { ...initialValues };
		$formContext.errors = { options: { display: false } };
	}}
>
	<slot values={$formContext.values} errors={$formContext.errors} />
</form>

<style>
	p {
		color: green;
	}
	form {
		padding: 10px;
		border: solid 1px #ccc;
		border-radius: 10px;
		max-width: 400px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
</style>
