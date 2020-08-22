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



export async function ldo_test()
{
	const compacted = await jsonld.compact(doc, context);
	//console.log(JSON.stringify(compacted, null, 2));
	//const nquads = await jsonld.toRDF(doc, {format: 'application/n-quads'});
	const nquads = await jsonld.toRDF(doc, {});
	console.log(nquads);
}



export class Ldo
{
	constructor(ctx, data)
	{
		this._ctx = ctx;
	}
	save(seen)
	{
		if (this in seen)
			return;
		const x = {...this, ...this._ctx};

	}
}
