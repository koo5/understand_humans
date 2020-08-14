<script>


	//import { _ } from 'svelte-i18n'


	import PrefixesListItem from './PrefixesListItem.svelte';

	//export const prefixes = [
	let prefixes = [
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

	let banana = 7;

</script>

<main>
	<div class="hello">
		<ul class="todo-list">

			{#if prefixes.length != 0}
				{prefixes.length} prefixes are defined:
			{:else}
				no prefixes are defined.
			{/if}

			{#each prefixes as item}
				<PrefixesListItem prefix={item} />
			{/each}

		</ul>

	</div>
</main>

<style>

</style>
