<script>

	import { get } from 'svelte/store'
	import {q, qq, indexes, set_quad} from './stores.js';
	export let presenter_uri = null;


	$: visible = qq(q(q($indexes['spgo'][presenter_uri],'presentation_selector_visible'),'@default'), (x) => {return (x.indexOf(true) !== -1)})
	function onChange()
	{
		console.log(!visible)
		set_quad(presenter_uri, 'presentation_selector_visible', '@default', !visible);

	}
</script>
<span>
	presentation_state_uri: {presenter_uri} presentation_selector_visible:
	<input type=checkbox checked={visible} on:change={onChange}>
	{visible}.
</span>
