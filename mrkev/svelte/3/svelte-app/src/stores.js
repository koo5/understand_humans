import produce from "immer";
import { writable } from 'svelte/store';

export const indexes = writable({'spgo':[]})


export function q(subj,pred)
{
	if (subj !== undefined)
		return subj[pred]
}
export function qq(subj,fn)
{
	if (subj !== undefined)
		return fn(subj)
}

export function set_quad(s,p,o,g)
{
	indexes.update(old_store => produce(old_store, draft =>
		{
			let idx = draft['spgo']
			if (idx[s] === undefined)
				idx[s] = {}
			if (idx[s][p] === undefined)
				idx[s][p] = {}
			if (idx[s][p][g] === undefined)
			{
				idx[s][p][g] = [o]
				return
			}
			// fixme out when introducing literal Objects
			if (idx[s][p][g].indexOf(o) == -1)
				idx[s][p][g].push(o)
		}
		)
	)
}



