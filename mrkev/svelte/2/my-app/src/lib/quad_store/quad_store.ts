import * as N3 from 'n3';

class Store extends N3.Store
{
	subscriptions:Array<((x:Array<N3.Quad>) => void)> = [];

	subscribe(subscription: (value: any) => void): (() => void)
	{
		subscription(this.value);
		this.subscriptions.push(subscription);
		return (() => {this.subscriptions = this.subscriptions.filter((x) => {x !== subscription})});
	}

	get value()
	{
		return this.getQuads(null, null, null, null)
	}

	fire()
	{
		let value = this.value;
		this.subscriptions.forEach((subscription) => subscription(value));
	}

	addQuad(s:any,p?:any,o?:any,g?:any,d?:any)
	{
		if (super.addQuad(s,p,o,g,d))
			this.fire()
	}

	addQuads(x:any)
	{
		let changed = false;
		for (var i = 0; i < x.length; i++)
			if (super.addQuad(x[i]))
				changed = true;
		if (changed)
			this.fire()
	}
}



export function new_quad_store()
{
	return new Store();
}
