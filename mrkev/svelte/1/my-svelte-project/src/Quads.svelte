<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import {Suri, Quad} from './quads.js';
    import { add_quad, quad_store } from './quad_store.js';



</script>

<div>
	{#if $quad_store.length != 0}
		store contains {$quad_store.length} quads:
	{:else}
		store is empty.
	{/if}

	<ul>

		{#each $quad_store as item}
			<QuadsListItem quad={item} />
		{/each}
	</ul>
</div>

<style>

</style>
