<script>

    import { log } from './log_store.js';
    import RdfNodeEditor from './RdfNodeEditor.svelte';

    export let quad;

    function handleRemove(e)
    {
        console.log(e);
    }

    function changeQuad()
    {
        //let quad = quad[0];
        quad.s = quad.s + 'XXX';
    }
    function logQuad()
    {
        log(quad);
    }


</script>

<li>


    <button class="destroy" title="delete" on:click={handleRemove}>x</button>
    <RdfNodeEditor bind:node={quad.s}></RdfNodeEditor>
    <RdfNodeEditor bind:node={quad.p}></RdfNodeEditor>
    <RdfNodeEditor bind:node={quad.o}></RdfNodeEditor>
    <RdfNodeEditor bind:node={quad.g}></RdfNodeEditor>
    <button title="logQuad" on:click={logQuad}>logQuad</button>
    <button title="changeQuad" on:click={changeQuad}>changeQuad</button>




</li>

<style>

    input, select {
        width:40%;
    }

</style>
