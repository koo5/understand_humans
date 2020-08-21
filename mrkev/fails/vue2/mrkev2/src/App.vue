<template>
  <div id="app">
    <TextEditor></TextEditor>
    <div id="log"></div>
  </div>
</template>

<script>
import TextEditor from './components/TextEditor.vue'

export default {
  name: 'App',
  components: {
    TextEditor
  }
}

function log(text) {
  var div = document.createElement("DIV");
  div.innerHTML = text;
  document.getElementById("log").prepend(div);
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
