<script>
	import Button from '../Button.svelte';
	import { Form, Field } from '../form';
	import {
		validateRequiredField,
		validateEmail,
		validateMinLength,
		validatePassword,
	} from '../form/validators';
	import { hasContext } from 'svelte';
</script>

<Form
	on:submit={e => {
		// console.log(e.detail);
	}}
	initialValues={{}}
	let:values
	let:errors
>
	<Field
		name="username"
		label="Username"
		type="text"
		validate={(value, label) => {
			return (
				validateRequiredField(value, label) ||
				validateMinLength(value, label, 4)
			);
		}}
	>
		<p slot="error" let:error style:color="green">{error}</p>
	</Field>
	<Field
		name="email"
		label="Email"
		type="email"
		validate={(value, label) => {
			return (
				validateRequiredField(value, label) ||
				validateEmail(value, label)
			);
		}}
	>
		<p slot="error" let:error style:color="green">{error}</p>
	</Field>
	<Field
		name="password"
		label="Password"
		type="password"
		validate={(value, label) => {
			return (
				validateRequiredField(value, label) ||
				validateMinLength(value, label, 8) ||
				validatePassword(value, label)
			);
		}}
	>
		<p slot="error" let:error>{error}</p>
	</Field>
	<Button type="submit" disabled={Object.keys(errors).length > 1} size="small"
		>Submit</Button
	>
</Form>
