<script>

	/*import ResizeObserver from "svelte-resize-observer";
  	import resize from 'svelte-actions-resize';*/
	import Resource_viewer from './Resource_viewer.svelte';
	import {preferences} from './preferences.js';
	import { get } from 'svelte/store'
	import {indexes} from './stores.js';
	import { onMount } from 'svelte';

	onMount(() =>
	{
		indexes.set({'spgo':{"uri1":{"presenter_uri":{"@default":["uri2"]}},
 "uri2":{"presentation_selector_visible":{"@default":[true]}}}});
	});

	let w;
	let h;

	//$: console.log(w);

	function submitText()
	{
		const text = get(preferences).current;
		console.log(text)
		indexes.set({'spgo':JSON.parse(text)});
		preferences.update(p =>	({...p, history:[text].concat(p.history)}));
	}

	function handleKeyDown(e)
	{
		if (e.keyCode === 13 && e.ctrlKey)
			submitText()
	}

	function handleHistoryItemChosen(x)
	{
		preferences.update(p => ({...p, current:x}));
	}

</script>

<main>

	<Resource_viewer uri='uri1'/>
	<textarea bind:value={$preferences.current} on:keydown={handleKeyDown}  bind:clientWidth={w} bind:clientHeight={h}/>
	<button on:click={submitText}>set</button>
	<hr>
	{#each $preferences.history as h}
		<div on:click={handleHistoryItemChosen(h)}>
			{h}
			<hr>
		</div>
	{/each}

	<p>size: {w}px x {h}px</p>

</main>

