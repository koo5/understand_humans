import * as jsonld from 'jsonld';

export class Ldo
{
	_template:object;
	_id_template:object;
	constructor(template:object, data:object)
	{
		Object.assign(this, data)
		this._template = template;
	}
	async save()
	{
		const result = save_ldo(this, [])
		let quads:any = await jsonld.toRDF(result, {});
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

function save_ldo(something:any, seen:any[])
{
	let result:any = '?';
	//console.log('x:')
	//console.log(x)

	if (something instanceof Ldo)
	{
		let x:object = something;
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
	else if (Array.isArray(something))
	{
		let x:any[] = something;
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
