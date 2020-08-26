import * as jsonld from 'jsonld';



const doc = {
  "http://schema.org/name": "Manu Sporny",
  "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
  "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
};
const context = {
  "name": "http://schema.org/name",
  "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
  "image": {"@id": "http://schema.org/image", "@type": "@id"}
};



const hh = {
  "@context": {"dcterms": "http://purl.org/dc/terms/"},
  "@id": "http://example.org/articles/8",
  "dcterms:title": [
    {
      "@value": "Das Kapital",
      "@language": "de"
    },
    {
      "@value": "Capital",
      "@language": "en"
    }
  ]
}

export async function ldo_test()
{
	//const compacted = await jsonld.compact(doc, context);
	//console.log(JSON.stringify(compacted, null, 2));
	//const nquads = await jsonld.toRDF(doc, {format: 'application/n-quads'});
	const nquads = await jsonld.toRDF(hh, {});
	console.log('ldo_test nquads:');
	console.log(nquads);
}

export class Ldo
{
	_template;
	_id_template;
	constructor(template, data)
	{
		Object.assign(this, data)
		this._template = template;
	}
	async save()
	{
		const result = save_ldo(this, [])
		let quads = await jsonld.toRDF(result, {});
		console.log('saved quads:')
		console.log(quads[1].object.datatype.value)
		return quads
	}
}

let last_unique_uri_number = -1;

function generate_unique_uri(suffix = "uri")
{
	return "http://rdf.lodgeit.net.au/iri_" + (++last_unique_uri_number).toString() + "_" + suffix;
}

function save_ldo(x, seen)
{
	let result:any = '?';
	//console.log('x:')
	//console.log(x)

	if (x instanceof Ldo)
	{
		if (seen.includes(x))
			return x._id_template;

		seen.push(x);
		x._id_template = {'@id':generate_unique_uri('ldo')}

		result = {...x._template, ...x._id_template}

		for (const property of Object.getOwnPropertyNames(x))
		{
			if (['_template', '_id_template'].includes(property)) continue;
			console.log('property:')
			console.log(`${property}: ${x[property]}`);
			result[property] = save_ldo(x[property], seen)
		}
	}
	else if (Array.isArray(x))
	{
		if (seen.includes(x))
			console.log('warning:seen this array before')
		seen.push(x);

		const items = []
		for (const item of x)
			items.push(save_ldo(item, seen))
		result = {'@list':items}
	}
	else
		result = x;
	console.log('result:')
	console.log(result)
	return result;
}
