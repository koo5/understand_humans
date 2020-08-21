# MRKEV - Markup Rdf Knowledge Editor and Viewer

## usage scenarios
[docs/scenario1.md](docs/scenario1.md) and [docs/scenario2.md](docs/scenario2.md) provide some clues.

## current version
development currently happens in [mrkev/svelte/2/my-app](mrkev/svelte/2/my-app)

## these pieces are being worked out:
	### a quad store
		saving/loading with N3.js. UI components for editing quads and prefixes. 
		
	### RDFQ
		RdfqSupergraph is a quadstore proxy that implements reasoning with rdfq:is-supergraph-of. It is a layer above the quad store that makes it easy to work with triples that:
			a) are referenced by other triples - they have their own triple id/context/graph
			b) are also a part of some graph.
		Should be compatible with RDF*.
	
	### Ldo
		a pseudo-ORM, a simple wrapper around Json-LD, using contexts to semiautomatically turn triples into javascript objects and back
		
	### reinterpret
		turn a tab-indented text with hierarchical notes into a rdf description of that hierarchy.
		
	### TextEditor
		using contenteditable to edit text. Buttons to mark up pieces of text, and link them to literals asserted in the store. Adding a two-way synchronization is possible. These annotated pieces are called Spans. Additional assertions can be created about Spans. Hierarchical notes are composed of Spans too.  
		Saving/loading of a rdf representation of the text, along with all quads.
		
	### notes tree
		a viewer of hierarchical notes as a tree.
		
	### QV
		Quad Viewer - similar to some other templating projects (https://github.com/koo5/hackery2/blob/master/src/data/notes/rdf_visualization.txt)
		The difference is support for hypergraphs. Generic rdf exploration as well as hardcoded renderers for our domain-specific object types.

## resources
### hypertext and semantic web
https://monoskop.org/images/b/be/Nelson_Ted_Literary_Machines_c1987_chs_0-1.pdf

## similar projects
http://say-editor.com
* mrkev aims to support hypergraphs, while say-editor is more of a lightweight RDFa markup tool
* say-editor has a nice plugin system for automatic detection of machine-interpretable parts of text and providing specialized micro-editors, mrkev should try to re-use these plugins

## what to implement - first thoughts
1) select some text in the editor area.

2) click "make span"

this will make sure that the text is wrapped in a <span> element, an uri is generated ("span1"), and is saved in a data attribute of the element. A triple <span1> <mrkev:value> "xxx" is generated. The "xxx" literal should then be kept in sync with the text. More triples can be added and reference it. 

3) triples frame

basic quads management.

## notes
this note is also an example of my hierarchical notes structure:
```
frontend editors tabbing behavior


	right tabbing behavior
		https://microsoft.github.io/monaco-editor/index.html

		https://ace.c9.io/

		https://www.cdolivet.com/editarea/editarea/exemples/exemple_full.html
			almost, it also indents the line where the cursor is, in addition to selected lines.

		https://repl.it/
			change setting to tabs
			somewhat weird behavior in cursor position after selection is dismissed

		https://icecoder.net/
			(probably), change setting to tabs

		https://codemirror.net/
			probably, change setting to tabs and see https://github.com/codemirror/CodeMirror/issues/2428


	wrong tabbing behavior
		https://jsfiddle.net/
			unless configurable?

		https://www.gitpod.io/
			unless configurable?

		https://medv.io/codejar/
			unless configurable?

	?
		http://say-editor.com
```
it would be rdf-ized like this:
```
n1 a note; value "wrong tabbing behavior"; children (
    [a note; value "https://jsfiddle.net/"; about [a sw; homepage "https://jsfiddle.net/"]; children (
        [a note; value "unless configurable?"])]
    ..
n1 a note; value "wrong tabbing behavior"; children (
    [a note; value "https://jsfiddle.net/"; about [a sw; homepage "https://jsfiddle.net/"]; children (
        [a note; value "unless configurable?"])]

```
