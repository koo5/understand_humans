import { readable, derived, writable } from 'svelte/store';

/*
These functions return svelte stores, that is, objects that you can subscribe() to and be notified of changes. See https://svelte.dev/tutorial/readable-stores

These svelte stores will, in turn, be notified when the underlying quadstore changes. In future, we want a whole datalog or prolog engine underneath, instead of just a dumb quadstore. And, ideally, one whose queries will be persistent and reactive wrt it's underlying kb changes, propagating changes up the proof tree with minimal overhead. At that point, this architecture will make more sense. Right now, when the underlying quadstore changes, all the queries just redo all the work.
*/



export const quadstore = writable([]);

export query(q) => derived(quadstore, $quadstore => {filter_quads_by_query(q,$quadstore)});





/*
What follows is the first layer of convenience, wrapping the purely non-deterministic-ish query() interface.

export function query_first
	// this is querying one or more solutions, then picking the first one
	query("+doc(

export function query_one()
{
	//query("!doc(
}
*/

