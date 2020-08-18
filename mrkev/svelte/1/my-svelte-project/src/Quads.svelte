<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import {Suri, Quad} from './quads.js';
    import { add_quad, quad_store } from './quad_store.js';



</script>

<main>
	<div>

		<ul>

			{#if $quad_store.length != 0}
				store contains {$quad_store.length} quads:
			{:else}
				store is empty.
			{/if}

			{#each $quad_store as item}
				<QuadsListItem quad={item} />
			{/each}

		</ul>
	</div>
</main>

<style>

</style>
