import * as jsonld from 'jsonld';
import * as n3 from 'n3';


/* see also
https://github.com/rdfjs-base/parser-jsonld/blob/6b200a9286c20ce6c03c83b76186740678964e17/lib/ParserStream.js#L38
and
https://github.com/digitalbazaar/jsonld.js/issues/243
 */
/*function fix_jsonldjs_quad(quad:any)
{
	for (const x of [quad, quad.subject, quad.predicate, quad.object, quad.graph])
	{

		//nope, this wouldn't work
		x.equals = Term.prototype.equals;

		if (x.termType === 'BlankNode' && x.value.startsWith('_:'))
			x.value = x.value.substring(2);
		if (x.termType === 'NamedNode' && x.value.startsWith('null:/'))
			// remove null:/ workaround for relative IRIs
			x.value = x.value.slice(6);
	}
}*/

function n3lib_term(plainTerm: any): n3.Term
{
	switch (plainTerm.termType)
	{
		case 'NamedNode':
			return n3.DataFactory.namedNode(plainTerm.value)
		case 'BlankNode':
			return n3.DataFactory.blankNode(plainTerm.value.substr(2))
		case 'Literal':
			return n3.DataFactory.literal(plainTerm.value, plainTerm.language || n3.DataFactory.namedNode(plainTerm.datatype.value))
		case 'DefaultGraph':
			return n3.DataFactory.defaultGraph()
		default:
			throw Error('unknown termType: ' + plainTerm.termType)
	}
}


interface Ldo_interface {
	_template:object;
	_id_template:object;
    [key: string]: any
}

export class Ldo implements Ldo_interface
{
	_template:object;
	_id_template:object;
    [key: string]: any;
	constructor(template:object, data:object)
	{
		Object.assign(this, data)
		this._template = template;
	}
	async save()
	{
		const my_jsonld = save_ldo(this, [])
		let quads:any = await jsonld.toRDF(my_jsonld, {});
		let quads2 = quads.map(n3lib_term);
		console.log('saved quads:')
		console.log(quads2/*[1].object.datatype.value*/)
		return quads2
	}
}

let last_unique_uri_number = -1;

function generate_unique_uri(suffix = "uri")
{
	return "http://rdf.lodgeit.net.au/iri_" + (++last_unique_uri_number).toString() + "_" + suffix;
}

function save_ldo(something:any, seen:any[]):any
{
	let result:any = '?';
	//console.log('x:')
	//console.log(x)

	if (something instanceof Ldo)
	{
		let x:any = something;
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
		result = something;
	console.log('result:')
	console.log(result)
	return result;
}
