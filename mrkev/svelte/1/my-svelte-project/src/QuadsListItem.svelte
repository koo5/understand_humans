<script>

    export let quad;

    function handleRemove(e)
    {
        console.log(e);
    }

</script>

<li>


    <button class="destroy" title="delete" on:click={handleRemove} data-testid="todo-remove">x</button>
    <input class="edit" value={quad.s} />
    <input class="edit" value={quad.p} />



</li>

<style>

    input, select {
        width:40%;
    }

</style>
