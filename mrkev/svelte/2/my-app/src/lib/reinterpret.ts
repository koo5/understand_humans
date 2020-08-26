import {Ldo} from './ldo'

const contexts = {
	'note':
		{

		},
	'span':
		{

		},
	'document':
		{
			'@context':
				{
					"m": "http://rdf/mrkev#",
					"notes": "m:document_has_notes",
					"author": "m:document_has_author",
				},
			'@type': 'm:document'
		}
};


export function new_document()
{
	return new Ldo(contexts.document, {notes:[], author:"aaa"});
}

export function new_note(body)
{
	return new Ldo(contexts.note, {body: new Ldo(contexts.span, {value:body})});
}

function reinterpret_as_hierarchical_notes(text:string)
{
	const root = new_document();
	const notes = [];
	let current_indent = 0;
	const lines = text.split('\n');
	lines.forEach((line) =>
	{
		let note = new_note(line.trim())
		let i = indents(line)
		make_note_a_child_of_note_with_lower_indent_or_of_root(root, note, notes)
	});
	return root;
}

function make_note_a_child_of_note_with_lower_indent_or_of_root(root, note, notes) {
	for (let i = notes.length - 1; i >= 0; i--) {
		let x = notes[i];
		if (x.indent < note.ident) {
			x.children.push(note)
			return
		}
	}
	root.notes.push(note)
}


/*
get number of tabs at beginning of string
 */
export function indents(line:string): number
{
	let result = 0;
	while(true)
	{
		if (line.length == 0)
			break;
		if (line.substr(0,1) == "\t") {
			line = line.substring(1)
			result++;
		}
		else break;
	}
	return result;
}
