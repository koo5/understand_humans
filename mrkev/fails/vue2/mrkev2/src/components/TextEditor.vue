<template>
  <div class="hello">
    <div id="editor" contenteditable="true">blabla</div>
  </div>
</template>

<script>
export default {
  name: 'TextEditor',
  props: {
  }
}


document.getElementById("editor").addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 229) return;
  if (event.keyCode === 9) { // tab key
    event.preventDefault();  // this will prevent us from tabbing out of the editor
    if (event.shiftKey) log('should unindent');
    // now insert four non-breaking spaces for the tab key
    var editor = document.getElementById("editor");
    var doc = editor.ownerDocument;
    var win = doc.defaultView;
    var sel = win.getSelection();
    var range = sel.getRangeAt(0);

    var tabNode = document.createTextNode("\t");
    range.insertNode(tabNode);

    range.setStartAfter(tabNode);
    range.setEndAfter(tabNode);
    sel.removeAllRanges();
    sel.addRange(range);
  }
});


</script>






<style scoped>
</style>
