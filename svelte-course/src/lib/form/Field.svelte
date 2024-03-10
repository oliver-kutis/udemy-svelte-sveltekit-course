<script>
	import { v4 as uuid } from 'uuid';
	// import { getContext } from 'svelte';
	import { getFormContext } from '../contexts/formContext.js';
	import formKey from './form-key.js';
	import { onMount } from 'svelte';

	export let name;
	export let type = 'text'; // optional
	export let label = undefined; // optional
	export let validate = undefined; // optional

	let isDirty = false;
	let inputTimer = null;

	const id = uuid();
	const formContext = getFormContext(formKey);

	onMount(() => {
		if (validate && validate($formContext.values[name])) {
			$formContext.errors[name] = validate(
				$formContext.values[name],
				label,
			);
		}
	});
</script>

<div class="field">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<input
		type={type}
		id={id}
		name={name}
		placeholder={label}
		value={$formContext.values[name] || ''}
		style:border={$formContext.errors[name] &&
			(isDirty || $formContext.errors.options.display)}
		on:input={e => {
			const value = e.currentTarget.value;
			$formContext.values[name] = value;
			console.log('input');
			if (value.length === 1) {
				console.log('inputTimerStart');
				inputTimer = setTimeout(() => {
					console.log('inputTimerEnd');
					isDirty = true;
					// $formContext.errors.options.display = true;
					clearTimeout(inputTimer);
				}, 2000);
			}
			if (validate && validate(value)) {
				$formContext.errors[name] = validate(value, label);
			} else {
				if ($formContext.errors[name]) delete $formContext.errors[name];
			}
			// disabledErrors = false;
		}}
	/>
	<!-- {#if $formContext.errors[name] && $formContext.values[name]} -->
	{#if $formContext.errors[name] && (isDirty || $formContext.errors.options.display)}
		<!-- The <p> tag is used as a fallback -->
		<slot name="error" error={$formContext.errors[name]}
			><p class="error">{$formContext.errors[name]}</p>
		</slot>
	{/if}
</div>

<style>
	div.field {
		margin-bottom: 10px;
	}
	label {
		display: block;
		margin-bottom: 5px;
		font-size: 14px;
	}
	input {
		/* width: %; */
		display: inline;
		height: 30px;
		width: 250px;
		max-width: 100%;
		padding: 0 10px;
		/* font-size: 14px; */
		border-radius: 5px;
		/* border: 1px solid #ccc; */
		/* border: 0px solid #ccc; */
	}
	p.error {
		color: red;
		margin: 5px 0 10px 0;
	}
</style>
