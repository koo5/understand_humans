<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import {quad_store, quad_store_save} from "../lib/quad_store";

</script>

<div>
	{#if $quad_store.length != 0}
		store contains {$quad_store.length} quads.
	{:else}
		store is empty.
	{/if}

	<button on:click={quad_store_save}>save as TriG</button>

	<ul>
		{#each $quad_store as item}
			<QuadsListItem quad={item}/>
		{/each}
	</ul>
</div>

<style>

	ul {
	margin: 0px;
	padding: 0px;

}

</style>
