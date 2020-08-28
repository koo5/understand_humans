<script>

	import PrefixesListItem from './PrefixesListItem.svelte';
	import {prefix_store} from '../lib/prefix_store.js';

</script>

<div>
	{#if $prefix_store.length != 0}
		{$prefix_store.length} prefixes are defined:
	{:else}
		no prefixes are defined.
	{/if}
	<ul>
		{#each $prefix_store as item}
			<PrefixesListItem prefix={item}/>
		{/each}
	</ul>
</div>

