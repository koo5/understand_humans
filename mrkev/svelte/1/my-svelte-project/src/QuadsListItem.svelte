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
        quad.s = quad.s + '!';
    }
    function logQuad()
    {
        log(quad);
    }


</script>

<li>


    <button class="destroy" title="delete" on:click={handleRemove} data-testid="todo-remove">x</button>

    <RdfNodeEditor node={quad.s}></RdfNodeEditor>


    <button title="log" on:click={logQuad}>logQuad</button>
    <button title="test" on:click={changeQuad}>changeQuad</button>




</li>

<style>

    input, select {
        width:40%;
    }

</style>
