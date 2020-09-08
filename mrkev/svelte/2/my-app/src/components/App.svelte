<script>

	import TextEditor from './TextEditor.svelte';
	import Prefixes from './Prefixes.svelte';
	import Quads from './Quads.svelte';
	import Log from './Log.svelte';

	import {onMount} from 'svelte';
	import {fetch_dataset} from '../lib/rdf_io.js';
	import {RDF, M, URI_PLAINTEXT} from  '../lib/quads.js';
	import {reinterpret_element_contents_as_hierarchical_notes} from '../lib/actions.js';
	import {quad_store_save_as_file_download, quads} from '../stores.js';

	import * as N3 from 'n3';
	const df = N3.DataFactory;


	let editor;

	async function add_static_dataset_to_store()
	{
		quads.addQuads(await fetch_dataset())
	}

	onMount(async () =>
	{
		await add_static_dataset_to_store();
		editor.populate_editor_with_document()
		//debugger;
		editor.reinterpret_text_as_hierarchical_notes();
		//await quad_store_save_as_file_download()
	});




</script>

	<hr>
	todo hierarchical notes view:
	<ul>
		<li>xxx</li>
		<li>yy</li>
	</ul>
	<hr>
	<TextEditor bind:this={editor}></TextEditor>
	<hr>
	<Quads></Quads>
	<hr>
	todo html view
	<hr>
	<Log></Log>
	<hr>
	<Prefixes></Prefixes>
	<hr>
	<button on:click={add_static_dataset_to_store()}>add_static_dataset_to_store</button>
	<hr>
	help: <a href="https://github.com/koo5/understand_humans/blob/master/mrkev/svelte/1/my-svelte-project/README.md">readme</a>
	<a href="https://github.com/koo5/understand_humans/blob/master/mrkev/svelte/1/my-svelte-project/docs/scenario1.md">scenario1</a>
	<a href="https://github.com/koo5/understand_humans/blob/master/mrkev/svelte/1/my-svelte-project/docs/scenario2.md">scenario2</a>
	<hr>



<style>
	main {
		padding: 0 1px;
	}
</style>
