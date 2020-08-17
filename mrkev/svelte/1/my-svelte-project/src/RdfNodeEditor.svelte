<script>

    import {rdf_node_parsing_result} from './quads.js';
    export let node;
    let errors = null;

    function change(e)
    {
    	const r = rdf_node_parsing_result(e.target.value);
    	if ('errors' in r)
            errors = r.errors;
    	else {
			errors = null;
			node = r.value;
		}
	}

</script>
    <input class="edit" value={node} on:input={change} />
        {#if (errors != null)}
             * {errors}
        {/if}
