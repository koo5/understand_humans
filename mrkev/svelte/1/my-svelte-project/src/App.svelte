<script>
	import {fetch_dataset} from './rdf_io.js';
	import TextEditor from './TextEditor.svelte';
	import Prefixes from './Prefixes.svelte';
	import Quads from './Quads.svelte';
	import Log from './Log.svelte';

	let kb;

	function load()
	{
	    fetch_dataset((loaded_kb) =>
	    {
        	kb = loaded_kb;
    	});
		finished_loading();
	}

	function finished_loading() {
		console.log(kb.getQuads(null, null, null));
		event__kb_updated_for_page();
	}

	function event__kb_updated_for_page()
	{
		for(let div of document.getElementsByClassName("mrkev_div"))
			event__kb_updated_for_frame(div);
	}

	function event__kb_updated_for_frame(div)
	{
		update_frame(div);
	}

	function update_frame(frame)
	{
		var editor_element = (frame.getElementsByClassName('editor'))[0];
		var doc_uri = frame.getElementsByClassName('doc_uri_selector')[0].value;
		populate_editor_with_document(editor_element, doc_uri);
	}

	var populate_editor_with_document = function(element, doc_uri)
	{
		var root = kb.getQuads(doc_uri,M+"root_uri", null)[0].object;

		if (kb.getQuads(root,RDF+"type", URI_PLAINTEXT).length != 0)
		{
			var value = kb.getQuads(root,M+'value', null)[0].object.value;
			console.log(value)
			document.getElementById("editor").innerText += value;
		}
		/*
		for (node in objects(doc_uri, children))
		{
			if is text:
				add span
			if is hierarchical_note
				add div
				add value
				add children

		}*/
	}


</script>

<main>
	<hr>
	<button on:click={load}>load</button>
	<hr>
	hierarchical notes view:
	<ul>
	<li>xxx</li>
		<li>yy</li>
	</ul>
	<hr>
	<TextEditor></TextEditor>
	<hr>
	<Quads></Quads>
	<hr>
	<Log></Log>
	<hr>
	<Prefixes></Prefixes>
	<hr>
	help: <a href="https://github.com/koo5/understand_humans/blob/master/mrkev/svelte/1/my-svelte-project/README.md">readme</a>
	<a href="https://github.com/koo5/understand_humans/blob/master/mrkev/svelte/1/my-svelte-project/docs/scenario1.md">scenario1</a>
	<a href="https://github.com/koo5/understand_humans/blob/master/mrkev/svelte/1/my-svelte-project/docs/scenario2.md">scenario2</a>
	<hr>
        <div>
            <!-- note: in firefox, the dropdown menu doesn't appear until you delete current text -->
            <input class="doc_uri_selector" type="text" name="dataset" list="known_datasets" value="http://rdf/dataset1"/>
            <datalist id="known_datasets">
                <option value="http://rdf/dataset1">dataset1</option>
                <option value="dataset2">dataset2</option>
            </datalist>
        </div>
	<hr>
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
