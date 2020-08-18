import { writable } from 'svelte/store';
import {Quad, Suri} from './quads';

export const quad_store = writable(
[
    new Quad(
            new Suri('','dataset1'),
            new Suri('rdfq','contains'),
            new Suri('', 'q0'),
            new Suri('','default'))
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
    quad_store.update(old_state=>[x].concat(old_state));
}
