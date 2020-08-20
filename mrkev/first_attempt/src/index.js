import "./style.css";
import _ from 'lodash';
const N3 = require('n3');
const M = "http://rdf/mrkev#";
const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
const URI_HIERARCHICAL_NOTES = M+'hierarchical_notes';
const URI_PLAINTEXT = M+'plain_text';

function fetch_dataset()
{
    const url = "dataset1.n3";
    fetch(url)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            else response.text().then(load_dataset);
        });

}

function load_dataset(kb_n3)
{
    const parser = new N3.Parser({ format: 'N3' });
    parser.parse(kb_n3,
        (error, quad, prefixes) => {
            if (error)
                console.log(error);
            if (quad)
                kb.addQuads([quad]);
            else {
                console.log(kb);
                finished_loading();
            }
        });
}

const kb = new N3.Store();


var finished_loading = function() {
    console.log(kb.getQuads(null, null, null));
    event__kb_updated_for_page();
}

var event__kb_updated_for_page = function()
{
    for(let div of document.getElementsByClassName("mrkev_div"))
        event__kb_updated_for_frame(div);
}

var event__kb_updated_for_frame = function(div)
{
    update_frame(div);
}





var update_frame = function(frame)
{
    var editor_element = (frame.getElementsByClassName('editor'))[0];
    var doc_uri = frame.getElementsByClassName('doc_uri_selector')[0].value;
    populate_editor_with_document(editor_element, doc_uri);
}


var populate_editor_with_document = function(element, doc_uri)
{
    var root = kb.getQuads(doc_uri,M+"root_uri", null)[0].object;

    if (kb.getQuads(root,RDF+"type", URI_PLAINTEXT).length != 0)
    {
        var value = kb.getQuads(root,M+'value', null)[0].object.value;
        console.log(value)
        document.getElementById("editor").innerText += value;
    }
    /*
    for (node in objects(doc_uri, children))
    {
        if is text:
            add span
        if is hierarchical_note
            add div
            add value
            add children

    }*/
}

/*
reinterpret_as_hierarchical_notes = function(kb, doc_uri)
{
	rewrite type
	add parameters,
	add children

}
*/

/*
reinterpret_as_hierarchical_notes = function(kb, doc_uri)
{
    rewrite type
    add parameters,
    add children

}
*/



fetch_dataset();
