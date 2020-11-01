<script>

	import { get } from 'svelte/store'
	import {q, qq, indexes, set_quad} from './stores.js';
	export let presenter_uri = null;


	$: visible = qq(q(q($indexes['spgo'][presenter_uri],'presentation_selector_visible'),'@default'), (x) => {return (x.indexOf(true) !== -1)})
	function onChange()
	{
		set_singleton_quad(presenter_uri, 'presentation_selector_visible', '@default', !visible);
	}

	let q1 = ReactiveSingleton(presenter_uri, 'presentation_selector_visible', '@default')

</script>
<span>
	presentation_state_uri: {presenter_uri} presentation_selector_visible:
	<input type=checkbox checked={visible} on:change={onChange}>
	{visible}.


	<!--
	can't do it like this, because not all keys are always present:
	<RdfLiteralCheckbox bind:value={$indexes['spgo'][presenter_uri],'presentation_selector_visible'),'@default'}/>
	maybe if we actually create a whole store for the query?



	-->

</span>
