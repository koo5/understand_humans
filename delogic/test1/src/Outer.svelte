<script>



	export let uri;
	let presentation = query_one({subj: uri, pred: "rkef:presentation_selection_strategy"})
</script>
<div>
	<PresentationSelector uri/>
	{if $presentation ==  "robust:result"}
	"robust:result"
	{/if}
	{if $presentation ==  "robust:document_set"}
	<ul>
	{#each $query(uri, "rdf:items", "?") as item (item.idx)}
		<li><ResourcePointer {item.uri}></li>
	{/each}
	</ul>
	{/if}
</div>
