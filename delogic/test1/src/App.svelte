<script>

	import { readable, derived, writable } from 'svelte/store';
	import Keypad from './Keypad.svelte';

	let pin = writable("111");

	$: view = $pin ? $pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

	function handleSubmit() {
		alert(`submitted ${$pin}`);
	}
</script>

<h1 style="color: {$pin ? '#333' : '#ccc'}">{view}</h1>

<Keypad bind:value={$pin} on:submit={handleSubmit}/>


<text

<!--

	<main>
		<Outer url="http://something"/>
	</main>

-->
