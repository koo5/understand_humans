<script>

	import SvelteTooltip from 'svelte-tooltip';
	import Popover from 'svelte-popover';


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
			if (node !== r.value)
				node = r.value;
		}
	}

</script>

    <input class="edit" value={node} on:input={change} />
 		{#if (errors != null)}
			<Popover overlayColor=#ffffff90>

				<span slot=target>
					<SvelteTooltip tip="parsing error" bottom >
						<img class="icon" src="icons/warning.svg" alt="warning"/>
					</SvelteTooltip>
				</span>
				<span slot=content>
                    {#each errors as error}
                        <dir>{error.errors}</dir>
                    {/each}
				</span>
			</Popover>
        {/if}

<style>
	.icon {
		width: 1em;
		height: 1em;
	}

</style>
