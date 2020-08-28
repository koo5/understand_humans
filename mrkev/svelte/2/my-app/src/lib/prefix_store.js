import {writable} from 'svelte/store';

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
