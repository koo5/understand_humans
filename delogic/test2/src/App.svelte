<script>
	import Test1 from './test1.svelte';
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
		xxx = result.subscribe;
	}

	let xxx = 1;
</script>

<main>

	<Test1/>
	<hr>
	<button on:click|preventDefault='{() => addquad()}'>Add</button>
	<br>
	<h3>the quadstore is now:</h3>
	rrr {JSON.stringify(result.subscribe, null,' ')} rrr

	rrr {JSON.stringify(xxx, null,' ')} rrr
	<ul>
		{#each ($result) as r (r.idx)}
			<li>{JSON.stringify(r,null,' ')}</li>
		{/each}
	</ul>





	<hr>
	<h3>viewing <code>"&#60;x&#62;"</code>:</h3>
	<Outer uri="<x>"/>

</main>

<br><br><br><br><br><br><br><br><br><br><br><br>
<small><a href="https://github.com/koo5/understand_humans/tree/master/delogic/test1">f**k me on github.</a></small>
