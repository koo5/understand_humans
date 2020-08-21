import {writable} from 'svelte/store';
import {Quad, Suri} from './quads';

export const prefix_store = writable([
	{
		'prefix': 'rdf',
		'uri': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
	},
	{
		'prefix': 'rdfs',
		'uri': 'http://www.w3.org/2000/01/rdf-schema#'
	},
	{
		'prefix': 'mrkev',
		'uri': 'https://rdf.lodgeit.net.au/mrkev'
	}
]);

export const quad_store = writable(
	[
		new Quad(
			new Suri('', 'dataset1'),
			new Suri('rdfq', 'contains'),
			new Suri('', 'q0'),
			new Suri('', 'default'))
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
	]
);

export function add_quad(x)
{
	console.log('add_quad:');
	console.log(x);
	quad_store.update(old_state => [x].concat(old_state));
}
