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

