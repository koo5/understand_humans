<script>
	import { log_store } from './log_store.js';


	//(!) Plugin svelte: App has unused export property 'prefixes'. If it is for external reference only, please consider using `export const prefixes`
	//export let prefixes;
	import TextEditor from './TextEditor.svelte';
	import Prefixes from './Prefixes.svelte';
	import Quads from './Quads.svelte';
	import Log from './Log.svelte';
</script>

<main>
	<TextEditor></TextEditor>
	<hr>
	<Quads></Quads>
	<hr>
	<Log></Log>
	<hr>
	<Prefixes></Prefixes>

</main>

<style>


	main {
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
	}

</style>
