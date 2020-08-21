<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import {add_quad, quad_store} from '../lib/quad_store.js';


</script>

<div>
	{#if $quad_store.length != 0}
		store contains {$quad_store.length} quads:
	{:else}
		store is empty.
	{/if}

	<ul>

		{#each $quad_store as item}
			<QuadsListItem quad={item}/>
		{/each}
	</ul>
</div>

<style>

</style>
