<script>
import { writable } from 'svelte/store';
let my_store = writable(0);
let my_store_subscribe_method = my_store.subscribe;
$: my_store_subscribe_method2 = my_store.subscribe;
</script>
<button on:click='{() => {my_store += 2;my_store_subscribe_method = my_store.subscribe}}'>Add two</button><br>

$my_store = {$my_store}<br>
<i>- that's expected.</i><br><br>

my_store = {my_store}<br>
<i>- as expected at first, but what's the 22222's?.</i><br><br>

my_store.subscribe = {my_store.subscribe}<br>
<i>- as expected at first, then undefined after clicking the button.</i><br><br>

my_store_subscribe_method = {my_store_subscribe_method}<br><br>

my_store_subscribe_method2 = {my_store_subscribe_method2}<br><br>



<a href="https://github.com/koo5/understand_humans/blob/master/delogic/test1/src/test1.svelte">source</a>

