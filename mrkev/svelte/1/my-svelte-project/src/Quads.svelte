<script>
	import SvelteTooltip from 'svelte-tooltip';
	import Popover from 'svelte-popover';
	import QuadsListItem from './QuadsListItem.svelte';
	import {Suri} from './quads.js';

	/* shortened URI */

/*
	export let quads = [
		/*dataset1 contains ctx0 default
		dataset1 contains ctx0 q1
		default contains q1..
*/
	let quads = [
		new Quad(
				new Suri('','dataset1'),
				new Suri('rdfq','contains'),
				new Suri('', 'q0'),
				new Suri('','default')),

/*		new Quad(
				new Suri('','q0'),
				new Suri('rdfq','contains'),
				new Suri('', 'q0'),
				new Suri('','default'))*/
		];



		//a www:reference
		//rdf:value '<https://lodgeit.net.au'>

	function talkAboutThisTriple()
	{
		const xhr = new XMLHttpRequest();
		const url = 'http://127.0.0.1:8000';
		xhr.open('GET', url);
		xhr.onreadystatechange = log;
		xhr.send();
	}


</script>

<main>
	<div>

		<ul>

			{#if quads.length != 0}
				kb contains {quads.length} quads:
			{:else}
				kb is empty.
			{/if}

			{#each quads as item}
				<QuadsListItem quad={item} />
			{/each}

		</ul>



		<span>
			<button on:click={talkAboutThisTriple}>talk about this triple</button>

			<Popover>
				<span slot=target>
					<SvelteTooltip tip="why would i want to do that?" bottom >
						<!-- todo
						https://github.com/ItalyPaleAle/svelte-spa-router/issues/66
						https://github.com/sveltejs/svelte/issues/1719
						https://stackoverflow.com/questions/134845/which-href-value-should-i-use-for-javascript-links-or-javascriptvoid0
						https://stackoverflow.com/questions/22940761/best-way-to-create-an-a-link-with-empty-href
						-->

						<a href="http://rooot.cz">?</a>
					</SvelteTooltip>
				</span>
				<span slot=content>
					<h4>why would i want to do that?</h4>
					This button gives the triple it's own context/graph, which in effect becomes a unique identifier of this triple.
					This allows you to make statements about it. For example:
					<code>sw:mrkev example:is_silly true default.</code>
					becomes:
					<code>sw:mrkev example:is_silly true q0.
					default contains q0 default.
					</code>
					and you can add:
					<code>
						q0 example:is_silly true default.
					</code>
				</span>
			</Popover>
		</span>
	</div>
</main>

<style>

</style>
