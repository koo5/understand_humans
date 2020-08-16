import { writable } from 'svelte/store';

export const log_store = writable([]);

export function log(x)
{
    store.prepend(x);
}
