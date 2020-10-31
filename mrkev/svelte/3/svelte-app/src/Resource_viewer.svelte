<script>

	import Hideable_presentation_selector from './Hideable_presentation_selector.svelte';
	import {q} from './q.js';

	export let indexes;
	export let uri = null;

	$: presenter_uri = q(indexes['spog'][uri],'presenter_uri');

</script>

<span>
see {uri}:
	<Hideable_presentation_selector presenter_uri={presenter_uri}></Hideable_presentation_selector>

</span>
