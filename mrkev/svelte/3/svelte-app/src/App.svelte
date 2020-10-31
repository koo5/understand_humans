<script>

	import ResizeObserver from "svelte-resize-observer";
  	import resize from 'svelte-actions-resize';
	import Resource_viewer from './Resource_viewer.svelte';
	import {preferences} from './stores.js';
	import { get } from 'svelte/store'

	let cv=55;

	$: console.log(cv);

	var indexes = {'spgo':[]}

	function submitText()
	{
		const text = get(preferences).current;
		console.log(text)
		indexes['spgo'] = JSON.parse(text);
		preferences.update(p =>	({...p, history:[text].concat(p.history)}));
	}

	function handleKeyDown(e)
	{
		if (e.keyCode === 13 && e.ctrlKey)
			submitText()
	}

	function handleHistoryItemChosen(x)
	{
		//console.log(get(preferences))
		preferences.update(p => ({...p, current:x}));
	}

	$: console.log(get(preferences))

</script>

<main>

	<Resource_viewer indexes={indexes} uri='uri1'/>
	<textarea bind:value={$preferences.current} on:keydown={handleKeyDown} bind:clientWidth={cv}/>



	<button on:click={submitText}>set</button>
	<hr>
	{#each $preferences.history as h}
		<div on:click={handleHistoryItemChosen(h)}>
			{h}
			<hr>
		</div>
	{/each}
</main>

