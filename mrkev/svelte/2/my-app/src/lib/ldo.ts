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
	_ctx;
	constructor(ctx, data)
	{
		Object.assign(this, data)
		this._ctx = ctx;
	}
	async save(seen)
	{
		//console.log('this:')
		//console.log(this)

		if (seen.includes(this))
			return;
		let ctx = this._ctx;

		//console.log('ctx:')
		//console.log(ctx)

		const x = {...this, ...ctx};
		delete x._ctx

		//console.log('x:')
		//console.log(x)


		return await jsonld.toRDF(x, {});
	}
}
