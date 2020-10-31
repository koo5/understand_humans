<script>

	import Hideable_presentation_selector from './Hideable_presentation_selector.svelte';
	import { get } from 'svelte/store'
	import {q, qq, indexes} from './stores.js';
	export let uri = null;
	$: presenter_uri = qq(q(q($indexes['spgo'][uri],'presenter_uri'),'@default'), (x) => x.slice(0)[0]);

</script>

<span>
see {uri}:
	<Hideable_presentation_selector presenter_uri={presenter_uri}></Hideable_presentation_selector>

</span>
