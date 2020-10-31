<script>

	import {q} from './q.js';

	export let indexes;
	export let presenter_uri = null;
	$: visible = q(q(indexes['spgo'][presenter_uri],'presentation_selector_visible'),'@default')

</script>


<span>
	presentation_state_uri: {presenter_uri} presentation_selector_visible: {visible}.
</span>
