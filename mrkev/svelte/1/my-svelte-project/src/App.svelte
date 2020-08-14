<script>
	//(!) Plugin svelte: App has unused export property 'prefixes'. If it is for external reference only, please consider using `export const prefixes`
	//export let prefixes;
	import TextEditor from './TextEditor.svelte';
	import Prefixes from './Prefixes.svelte';
	import Quads from './Quads.svelte';
</script>

<main>
	<Prefixes></Prefixes>
	<hr>
	<TextEditor></TextEditor>
	<hr>
	<Quads></Quads>
	log:
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
		font-size: 4em;
		font-weight: 100;
	}

</style>
