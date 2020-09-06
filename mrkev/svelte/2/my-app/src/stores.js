import {new_quad_store} from "./lib/quad_store/quad_store.ts";
import * as N3 from 'n3';
import {prefixes_as_dict} from './lib/prefixes';
import {get} from 'svelte/store';
import {saveAs} from 'file-saver';

export const quads = new_quad_store();

export function quad_store_save_as_file_download()
{
	const writer = new N3.Writer({ prefixes: prefixes_as_dict() });
	/*console.log(get(quad_store))
	get(quad_store).forEach((i) => writer.addQuad(i));
	get(quad_store).forEach((i) => console.log(i));
	console.log(writer)*/
	const q = get(quads)
	//console.log(q)
	const cb = (x) => {if (x)console.log(x)}
	for (var i = 0; i < q.length; i++)
		writer.addQuad(q[i],cb);
	//console.log(writer)
	writer.end((error, result) => {
		if (error)
			throw error;
		let blob = new Blob([result], {type: "text/plain;charset=utf-8"});
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
