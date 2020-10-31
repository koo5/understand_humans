<script>

	import Resource_viewer from './Resource_viewer.svelte';
	import {preferences} from './stores.js';
	import { get } from 'svelte/store'

	var indexes = {'spog':[]}
	let text;

	function handleTextChange()
	{
		indexes['spog'] = JSON.parse(text);
		preferences.update(p =>	({...p, history:[text].concat(p.history)}));
	}

	function handleKeyDown(e)
	{
		if (e.keyCode === 13 && e.ctrlKey)
		{
			handleTextChange()
		}
	}

	function handleHistoryItemChosen(x)
	{
		text = x
	}

	$: console.log(get(preferences))

</script>

<main>

	<Resource_viewer indexes={indexes} uri='uri1'/>

	<textarea bind:value={text} on:keydown={handleKeyDown}></textarea>
	<button on:click={handleTextChange}>set</button>
	<hr>
	{#each $preferences.history as h}
		<div on:click={handleHistoryItemChosen(h)}>
			{h}
			<hr>
		</div>
	{/each}


</main>

