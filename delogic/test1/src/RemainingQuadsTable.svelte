<script>

	export let uri, quads;

</script>

<table class="table">
	<thead>
	<tr>
		<th scope="col">idx</th>
		<th scope="col">p</th>
		<th scope="col">o</th>
		<th scope="col">g</th>
	</tr>
	</thead>
	<tbody>
	{#each quads as quad (quad.idx)}
		<tr>
			<th scope="row">quad.idx</th>
			<td>quad.p</td>
			<td>quad.o</td>
			<td>quad.g</td>
		</tr>
	{/each}
	</tbody>
</table>
