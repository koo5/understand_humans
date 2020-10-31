<script>

	import Hideable_presentation_selector from './Hideable_presentation_selector.svelte';
	import {q} from './q.js';

	export let indexes;
	export let uri = null;

	$: presenter_uri = q(q(indexes['spgo'][uri],'presenter_uri'),'@default');

</script>

<span>
see {uri}:
	<Hideable_presentation_selector indexes={indexes} presenter_uri={presenter_uri}></Hideable_presentation_selector>

</span>
