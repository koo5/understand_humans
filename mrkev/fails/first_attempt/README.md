# MRKEV - Mixed Rdf Knowledge Editor and Viewer

### resources
#### hypertext and semantic web
https://monoskop.org/images/b/be/Nelson_Ted_Literary_Machines_c1987_chs_0-1.pdf


### about
scenario1.md and scenario2.md provide some clues.


### what to implement - first thoughts
1) select some text in the editor area.


2) click "make span"

this will make sure that the text is wrapped in a <span> element, an uri is generated ("span1"), and is saved in a data attribute of the element. A triple <span1> <mrkev:value> "xxx" is generated. The "xxx" literal should then be kept in sync with the text. More triples can be added and reference it. 

3) triples frame

basic quads management.
