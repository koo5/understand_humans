<script>
	import Outer from './Outer.svelte';
	import QS from './my_quadstore';
	let {_quads,query} = QS;
	let result = query({});

	function addquad()
	{
		_quads.update((old) => {
			let quad = {
				s: "<x>",
				p: "<x>",
				o: "<x>",
				g: "<x>"
			};
			let now = old.concat(quad);
			return now;
		});
	}
</script>

<main>

	<button on:click|preventDefault='{() => addquad()}'>Add</button>
	<br>
	<h3>the quadstore is now:</h3>
	<ul>
		{#each ($result) as r (r.idx)}
			<li>{JSON.stringify(r,null,' ')}</li>
		{/each}
	</ul>

	<hr>
	<h3>viewing <code>"&#60;x&#62;"</code>:</h3>
	<Outer uri="<x>"/>

</main>
