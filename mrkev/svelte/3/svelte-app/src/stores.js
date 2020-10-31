import { writable } from 'svelte-local-storage-store'

export const preferences = writable('preferences', {'current':"{}", 'history':[ "{\"uri1\":{\"presenter_uri\":\"xxx\"}}" ]})


