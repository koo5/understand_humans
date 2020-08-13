<script>
	export let prefixes;
	import TextEditor from './TextEditor.svelte';
	import Prefixes from './Prefixes.svelte';
	import Quads from './Quads.svelte';
</script>

<main>
	<Prefixes prefixes={prefixes}></Prefixes>
	<TextEditor></TextEditor>
	<Quads></Quads>
	<div id="log" class="log"></div>
</main>

<style>

	.log {
		background-color: #dddddd;
		margin: 2px;
		padding: 2px;
	}

	main {
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

</style>
