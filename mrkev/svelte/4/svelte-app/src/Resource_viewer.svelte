<script>

	import Hideable_presentation_selector from './Hideable_presentation_selector.svelte';
	import { get } from 'svelte/store'
	import {q, qq, indexes} from './stores.js';
	import {onMount} from 'svelte';

	export let uri = null;

	export let presenter = null;
	export let presenter_selection_strategy = 'auto';

	onMount(() =>
	{
		select_presenter();
	}

	function on_changed_presenter_selection_strategy()
	{
		if (presenter_selection_strategy === 'auto')
			presenter = 'quads'
	}

</script>

<span>
{uri}:
	

</span>
