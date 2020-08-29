/*
a span is a part of a list, which is a 'note_has_items' of a note. The note is a part of a hierarchy under one of root notes of a document.
 */

import {Ldo} from './ldo'
import {add_quads} from "./quad_store";

const templates = {
	'document':
		{
			'@context':
				{
					"m": "http://rdf/mrkev#",
					"notes": "m:document_has_notes",
					"author": "m:document_has_author",
				},
			'@type': 'm:document'
		},
	'note':
		{
			'@context':
				{
					"m": "http://rdf/mrkev#",
					"notes": "m:note_has_items",
					"author": "m:note_has_author",
				},
			'@type': 'm:note'
		},

	'span':
		{
			'@context':
				{
					"m": "http://rdf/mrkev#",
					"value": "m:span_has_value",
					"author": "m:span_has_author",
				},
			'@type': 'm:span'
		}
}

export function new_document()
{
	return new Ldo(templates.document,{notes:[], author:"aaa"});
}

export function new_note(body:Ldo)
{
	return new Ldo(templates.note, {body: body})
}

export const new_span = (text:string) => new Ldo(templates.span, {value:text})


export function reinterpret_as_hierarchical_notes(text:string)
{
	const root = new_document();
	const notes:Ldo[] = [];
	let current_indent = 0;
	const lines = text.split('\n');
	lines.forEach((line) =>
	{
		let note = new_note(new_span(line.trim()))
		let i = indents(line)
		make_note_a_child_of_note_with_lower_indent_or_of_root(root, note, notes)
	});
	return root;
}

function make_note_a_child_of_note_with_lower_indent_or_of_root(root:Ldo, note:Ldo, notes:Array<Ldo>) {
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

