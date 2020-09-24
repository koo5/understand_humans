<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import {quads, quad_store_save_as_file_download} from '../stores.js';
	import * as N3 from 'n3';


	class IncompleteQuad
	{
		constructor()
		{
			this.nodes = ['','','',''] /* s p o g */
		}
	}

/*


	let new_item = new IncompleteQuad()






	create new, abstract, quad store, that aggregates multiple real quad stores
	text editor etc will use the abstract one
	it will contain the main store and the staging store





 */



</script>

<div>
	{#if $quads.length != 0}
		store contains {$quads.length} quads.
	{:else}
		store is empty.
	{/if}

	<button on:click={quad_store_save_as_file_download}>save as TriG</button>

	<ul>
		add:
		<QuadsListItem quad={new_item}/>
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
