<script>
	import settings from '../stores/settings';
	import direction from '../stores/direction';

	let dir;
	$: dir = $direction;
</script>

{$direction}
<h2>Settings</h2>

<button on:click={() => settings.reset()}> Reset settings</button>
<button on:click={() => settings.toggleColorScheme()}>
	Toggle color scheme
</button>
<button on:click={() => settings.updateSetting('language', Math.random())}>
	Update langugage</button
>
<button
	on:click={() =>
		$settings.language === 'en'
			? ($settings.language = 'ar')
			: ($settings.language = 'en')}
	>Switch to {$settings.language === 'en' ? 'Arabic' : 'English'}</button
>

<div style:margin-top="10px">
	<h3>Color scheme</h3>
	<label>
		<input type="radio" value="dark" bind:group={$settings.colorScheme} />
		Dark mode
	</label>

	<label>
		<input type="radio" value="light" bind:group={$settings.colorScheme} />
		Light mode
	</label>

	<h3>Language</h3>
	<select bind:value={$settings.language}>
		<option value="en">English</option>
		<option value="ar">Arabic</option>
	</select>
</div>
