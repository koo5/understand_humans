<script>

	export let spog;
	$: s = spog[0];

</script>

<li>
	<input class="edit" value={s}/>
</li>

<style>

	input, select {
		width: 40%;
	}

</style>
