import { readable, derived, writable } from 'svelte/store';

export const quadstore = (__quad_list) =>
{
	let _quads = writable(__quad_list);
	let query = (_query) => derived(_quads, __quad_list => {
		return filter_quads_by_query(_query,__quad_list);
	});
	return {_quads,query};
}
function filter_quads_by_query(query,__quad_list)
{
	/*console.log(query);
	console.log(__quad_list);*/

	let result = [];

	var i = 0;
	for (i = 0; i < __quad_list.length; i++)
	{
		const q = __quad_list[i];
		if (
			match(query.s,q.s) &&
			match(query.p,q.p) &&
			match(query.o,q.o) &&
			match(query.g,q.g)
		)
			result.push({...q, idx:i});
	}

	//console.log(result);
	return result;
}

function match(query, node)
{
	if (query == undefined || query == "?")
		return true;
	return (query == node);
}



/*
These functions return svelte stores, that is, objects that you can subscribe() to and be notified of changes. See https://svelte.dev/tutorial/readable-stores

These svelte stores will, in turn, be notified when the underlying quadstore changes. In future, we want a whole datalog or prolog engine underneath, instead of just a dumb quadstore. And, ideally, one whose queries will be persistent and reactive wrt it's underlying kb changes, propagating changes up the proof tree with minimal overhead. At that point, this architecture will make more sense. Right now, when the underlying quadstore changes, all the queries just redo all the work.
*/


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


/*
rdf node format/representation:
the quadstore holds a list of prefixes. Uris are always normalized, if possible (by some algo that picks the last form that eats of the most characters from the url that is being shortened, or whatever.
full uris are signified by a string like this: "<http://blablabla>".
"?" is free for use for signifying a wildcard.
rdf literals are represented by objects .. maybe let's use N3.js classes?

 */
