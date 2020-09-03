<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import {quads, quad_store_save_as_file_download} from '../stores.js';

</script>

<div>
	{#if $quads.length != 0}
		store contains {$quads.length} quads.
	{:else}
		store is empty.
	{/if}

	<button on:click={quad_store_save_as_file_download}>save as TriG</button>

	<ul>
		{#each $quads as item}
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
