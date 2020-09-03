import {writable} from 'svelte/store';
import {prefixes_as_dict} from "../lib/prefixes";
import * as N3 from 'n3';
import {saveAs} from 'file-saver';
import {get} from "svelte/store";


const kb = new N3.Store();


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


