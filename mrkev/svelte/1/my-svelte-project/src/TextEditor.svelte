<script>

	import {Suri, Quad, Literal} from './quads.js';
    import { log } from './log_store.js';
    import { add_quad } from './quad_store.js';
	import { saveAs } from 'file-saver';

	function saveText()
	{
		const editor = document.getElementById("editor");
		var blob = new Blob([editor.innerHTML], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "hello world.txt");
	}



	function onEditorKeydown(event)
	{
		if (event.isComposing || event.keyCode === 229) return;
		if (event.keyCode === 9) { // tab key
			event.preventDefault();  // this will prevent us from tabbing out of the editor
			if (event.shiftKey) log('should unindent');
			// now insert four non-breaking spaces for the tab key
			var editor = document.getElementById("editor");
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

	function makeSpan()
	{
		const span = wrap_selection();
		span.dataset.uri = generate_unique_uri('span');
		add_quad(
			new Quad(
				span.dataset.uri,
				new Suri('mrkev','value'),
				new Literal(text_of_span(span)),
				new Suri('','default')
			)
		);
	}

	function text_of_span(span)
	{
		return span.innerText;
	}

	function wrap_selection() {
		const editor = document.getElementById("editor");
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

</script>

<div class="text_editor">
	document:
	<pre>
		<div id="editor" contenteditable="true" on:keydown={onEditorKeydown}>blabla</div>
	</pre>
	<button on:click={makeSpan}>surroundContents()</button>
	<button on:click={saveText}>saveText</button>
	<button on:click={saveAll}>saveAll</button>
</div>

<style>

	.text_editor {
		margin: 1px;
		padding: 1px;
	}


</style>
