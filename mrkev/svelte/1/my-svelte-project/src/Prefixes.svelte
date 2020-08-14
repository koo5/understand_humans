<script>

	import PrefixesListItem from './PrefixesListItem.svelte';


	export const prefixes = [
		{
			'prefix':'rdf',
			'uri':'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
		},
		{
			'prefix':'rdfs',
			'uri':'http://www.w3.org/2000/01/rdf-schema#'
		},
		{
			'prefix':'mrkev',
			'uri':'https://rdf.lodgeit.net.au/mrkev'
		}
	];

</script>

<main>
	<div class="hello">
		<ul class="todo-list">
			{#each $prefixes as item}
				<PrefixesListItem {item} />
			{/each}
		</ul>

	</div>
</main>

<style>

</style>
