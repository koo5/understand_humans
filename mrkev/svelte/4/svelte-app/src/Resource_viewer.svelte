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

	$: type = q(uri, u("rdf:type"), '@defaut');



</script>

<span>
{uri}:
	{#if presenter === null}
		presenter === null, that's a bug.
	{/if}
	{#if presenter === 'quads'}
		a table..
	{/if}
	{#if presenter === 'Robust built-in'}
		{#if type === q("robust:reportset")}
			these are the reports we generated for you:
			<ul>
				<!-- so let's say, there is:
				q(uri, u('robust:items'))
				@default graph is assumed.
				you get a list of results
				each result is {value, annotations}
				annotations might be represented simply by a list of contexts.
				Let's say we pass this to an AnnotationViewer,
				then, each context can be passed to a ResourceViewer maybe?


Reports:
abc
def
ghi

let’s not forget that it’s the multiplicity of the whole reportset that we’re dealing with here.
So, while the normal rendering might be without any boxes or whatever, a rendering in case of multiple reportsets should indicate the multiplicity somehow:

Reports:
multiple nodes:
-----
abc
def
ghi
------
-----
123
456
789
------

-->

				let's see if that could maybe be a different node type:
				<QueryResultViewer s={uri} p={u('robust:items')}/>



				{#each rdf_list_to_array(q_singleton)) as report}
					<li><svelte:self uri={report}/></li>
				{/each}
			</ul>
		{/if}
	{/if}


</span>

<style>

	/*


	if we take it to the extreme,
	0) an annotation can be annotated.
	1) rdf2:is_part_of can be annotated.
	1b) by "annotation", i don't necessarily mean just rdfs:comment "something". it's links to arbitrary stuff that must be rendered etc.
	2) rdf:type can be annotated. It will probably show as a note at the top of the resource's rendering.
	3) The ui can set some hard rules, like, only one rdf:type. If there were multiple rdf:type triples, each in a different graph, then we could render the resource multiple times, once for each type. There would be at least two valid approaches to selecting what triples to take into account when rendering each variant: All the triples rdf2:is_part_of in @default, or just all the triples in the "highest"/closest to @default graph that still has only one rdf:type triple. This second approach might be seen as showing the original meaning intended by a graph unaware that another graph describes the resource too. The first approach is more "true" from the perspective of the app.
	4) what do we do if we don't want to limit q(uri, u('robust:items')) to a singleton?
	One interesting use of this would be to compare versions of documents (or rather, compare reportsets resulting from different runs, in this case)

	*/


/*
				{#each rdf_list_to_array(q_singleton(uri, u('robust:items'))) as report}
					<li><svelte:self uri={report}/></li>
				{/each}
*/

</style>

