import _ from 'lodash';
import * as N3 from 'n3';
//const N3 = require('n3');
const M = "http://rdf/mrkev#";
const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
const URI_HIERARCHICAL_NOTES = M+'hierarchical_notes';
const URI_PLAINTEXT = M+'plain_text';

export function fetch_dataset(success_callback)
{
    const url = "dataset1.n3";
    fetch(url)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            else response.text().then(load_dataset(success_callback));
        });
}

function load_dataset(n3_text, success_callback)
{
	const kb = new N3.Store();
	const parser = new N3.Parser({ format: 'N3' });
    parser.parse(n3_text,
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
	success_callback(kb);
}

