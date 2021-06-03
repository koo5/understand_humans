import _ from 'lodash';


import * as N3 from 'n3';

//const N3 = require('n3');


export async function fetch_dataset_from_uri()
{
	const url = "dataset1.n3";
	let response = await fetch(url);
	if (!response.ok) throw Error(response.statusText);
	let text = await response.text();
	return await load_dataset_from_text(text);
}

async function load_dataset_from_text(n3_text)
{
	const kb = [];
	const parser = new N3.Parser({format: 'N3'});
	await parser.parse(n3_text,
		(error, quad, prefixes) =>
		{
			if (error)
				console.log(error);
			if (quad)
				kb.push(quad);
		});
	/*console.log("n3 text loaded:");
	console.log(kb);*/
	return kb;
}

