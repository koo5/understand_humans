<script>

    export let prefix;

    function handleRemove(e)
    {
        console.log(e);
    }

</script>

<li>


    <button class="destroy" on:click={handleRemove} data-testid="todo-remove" />
    <input class="edit" value={prefix.prefix} />



</li>
