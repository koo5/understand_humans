<script>

	import {Suri, Quad, Literal} from '../lib/quads.js';
	import {log} from '../lib/log_store.js';
	import {add_quad, add_quads} from '../lib/quad_store.js';
	import {reinterpret_as_hierarchical_notes} from '../lib/reinterpret.ts';
	import {saveAs} from 'file-saver';

	function addCode(cls)
	{
		var tag = document.createElement("SPAN");
		tag.className = cls;
		tag.innerHTML = "This is the text which has been inserted by JS";
		tag.dataset.xxx = "yyy";
		document.getElementById("editor").append(tag);
	}


	function saveText()
	{
		const editor = document.getElementById("editor");
		var blob = new Blob([editor.innerHTML], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "hello world.txt");
	}


	function onEditorKeydown(event)
	{
		if (event.isComposing || event.keyCode === 229) return;
		if (event.keyCode === 9)
		{ // tab key
			event.preventDefault();  // this will prevent us from tabbing out of the editor
			if (event.shiftKey) log('should unindent');
			// now insert four non-breaking spaces for the tab key
			var editor = event.target;
			var doc = editor.ownerDocument;
			var win = doc.defaultView;
			var sel = win.getSelection();
			var range = sel.getRangeAt(0);

			var tabNode = document.createTextNode("\t");
			range.insertNode(tabNode);

			range.setStartAfter(tabNode);
			range.setEndAfter(tabNode);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}


	var last_unique_uri_number = -1;


	function generate_unique_uri(suffix = "uri")
	{
		return new Suri('', "uri_" + (++last_unique_uri_number).toString() + "_" + suffix);
	}

	function uri(text)
	{
		return text;
	}

	function editorElement(sibling_element)
	{
		return siblingElementByClass('editor', sibling_element);
	}

	function siblingElementByClass(cls, sibling_element)
	{
		while(sibling_element != null)
		{
			let maybe_editor = sibling_element.getElementsByClassName(cls)[0];
			if (maybe_editor != null)
				return maybe_editor;
			sibling_element = sibling_element.parentElement;
		}
	}


	function makeSpan(e)
	{
		const editor = editorElement(e.target);
		const span = wrap_selection(editor);
		span.dataset.uri = generate_unique_uri('span');
		add_quad(
			new Quad(
				span.dataset.uri,
				new Suri('mrkev', 'value'),
				new Literal(text_of_span(span)),
				new Suri('', 'default')
			)
		);
	}

	function text_of_span(span)
	{
		return span.innerText;
	}

	function wrap_selection(editor)
	{
		const doc = editor.ownerDocument;
		const win = doc.defaultView;
		const sel = win.getSelection();
		const range = sel.getRangeAt(0);
		const span = doc.createElement('span');
		// eventually we'll want something like: https://stackoverflow.com/questions/15157435/get-last-character-before-caret-position-in-javascript
		// or change the paradigm to overlapping markup..somehow
		// the problem is that the text can span across "physical" elements...automatically inserted divs, brs..
		range.surroundContents(span);
		return span;
	}

	function saveAll()
	{

	}

	function onChange(e)
	{
		const view = siblingElementByClass('html_view', e.target);
		view.innerText = e.target.innerHTML;
	}

	async function on_reinterpret_as_hierarchical_notes(e)
	{
		const editor = editorElement(e.target);
		const ldo = reinterpret_as_hierarchical_notes(editor.innerText);
		const quads = await ldo.save()
		add_quads(quads)
	}

</script>

<div class="mrkev_div">
	<div>
		<!-- note: in firefox, the dropdown menu doesn't appear until you delete current text -->
		<input class="doc_uri_selector" type="text" name="dataset" list="known_datasets" value="http://rdf/dataset1"/>
		<datalist id="known_datasets">
			<option value="http://rdf/dataset1">dataset1</option>
			<option value="dataset2">dataset2</option>
		</datalist>
	</div>

	text document:

	<pre>
		<div class="editor" contenteditable="true" on:keydown={onEditorKeydown} on:change={onChange}>
			blablabla<br/>
		</div>
		<div class="html_view">
		</div>
	</pre>
	<button on:click={on_reinterpret_as_hierarchical_notes}>reinterpret_as_hierarchical_notes</button>
	<button on:click={makeSpan}>selection to rdf</button>
	<button on:click={saveText}>saveText</button>
	<button on:click={saveAll}>saveAll</button>
</div>

<style>

	.editor
	{
		padding: 0.3em;

	}

</style>
