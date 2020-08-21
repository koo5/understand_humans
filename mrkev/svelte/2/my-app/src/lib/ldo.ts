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
	console.log(JSON.stringify(compacted, null, 2));
}



export class Ldo
{
	constructor(ctx)
	{
		this._ctx = ctx;
	}
	save(seen)
	{
		if (this in seen)
			return;
	}
}
