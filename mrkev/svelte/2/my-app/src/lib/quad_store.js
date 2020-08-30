import {writable} from 'svelte/store';
import {prefixes_as_dict} from "../lib/prefixes";
import * as N3 from 'n3';
import {saveAs} from 'file-saver';
import {get} from "svelte/store";



export const quad_store = writable([]);

export function add_quad(x)
{
	console.log('add_quad:');
	console.log(x);
	quad_store.update(old_state => [x].concat(old_state));
}

export function add_quads(quads)
{
	console.log('add_quads:');
	console.log(quads);
	quad_store.update(old_state => quads.concat(old_state));
}



export function quad_store_save()
{
	const writer = new N3.Writer({ prefixes: prefixes_as_dict() });
	/*console.log(get(quad_store))
	get(quad_store).forEach((i) => writer.addQuad(i));
	get(quad_store).forEach((i) => console.log(i));
	console.log(writer)*/
	const quads = get(quad_store)
	console.log(quads)
	const cb = (x) => {if (x)console.log(x)}
	for (var i = 0; i < quads.length; i++)
		writer.addQuad(quads[i],cb);

	console.log(writer)
	writer.end((error, result) => {
		if (error)
			throw error;
		var blob = new Blob([result], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "hello world.trig");
	})
}



		/*
		new Quad(
			new Suri('', 'dataset1'),
			new Suri('rdfq', 'contains'),
			new Suri('', 'q0'),
			new Suri('', 'default'))
		 */
		/*		new Quad(
					new Suri('','q0'),
					new Suri('rdfq','contains'),
					new Suri('', 'q0'),
					new Suri('','default'))*/
		/*
				export let quads = [
					/*dataset1 contains ctx0 default
					dataset1 contains ctx0 q1
					default contains q1..
		*/
		//a www:reference
		//rdf:value '<https://lodgeit.net.au'>
