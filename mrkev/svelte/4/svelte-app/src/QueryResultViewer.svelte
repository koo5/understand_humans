<script>
	export let q = {s:, p:. o:};
	$: results = query(q)
</script>
{#if length(results) == 1}
	<AnnotatedResult results[0]/>
{/if}
{#if length(results) == 0}
	∅
{/if}
{#if length(results) > 1}
	multiple nodes:
	{#each results as result}
		<AnnotatedResult result/>
	{/each}
{/if}

