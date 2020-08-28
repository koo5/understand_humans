import {writable} from 'svelte/store';
import * as n from 'n3';


export const quad_store = writable([]);

export function add_quad(x)
{
	console.log('add_quad:');
	console.log(x);
	quad_store.update(old_state => [x].concat(old_state));
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
