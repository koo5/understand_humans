<script>

    import { log } from './log_store.js';


    export let quad;

    function handleRemove(e)
    {
        console.log(e);
    }

    $: s = quad.spog[0];

    function changeQuad()
    {
        //let quad = quad[0];
        quad.s = quad.s + '!';
    }

</script>

<li>


    <button class="destroy" title="delete" on:click={handleRemove} data-testid="todo-remove">x</button>
    <input class="edit" value={s} />
    <input class="edit" value={quad.s} />
    <button title="log" on:click={()=>{console.log(quad)}}>x</button>

    <button title="test" on:click={changeQuad}>changeQuad</button>




</li>

<style>

    input, select {
        width:40%;
    }

</style>
