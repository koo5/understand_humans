import {quads} from '../stores.js';
import {reinterpret_as_hierarchical_notes} from './reinterpret.ts';

export function editorElement(sibling_element)
{
	return siblingElementByClass('editor', sibling_element);
}

export function siblingElementByClass(cls, sibling_element)
{
	while(sibling_element != null)
	{
		let maybe_editor = sibling_element.getElementsByClassName(cls)[0];
		if (maybe_editor != null)
			return maybe_editor;
		sibling_element = sibling_element.parentElement;
	}
}

export async function reinterpret_element_contents_as_hierarchical_notes(element)
{
	const ldo = reinterpret_as_hierarchical_notes(editorElement(element).innerText);
	const quads/*:RdfDataSet*/ = await ldo.save()
	quads.addQuads(quads)
}
