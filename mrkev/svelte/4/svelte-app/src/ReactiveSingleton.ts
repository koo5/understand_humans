import {q, qq, indexes, set_singleton_quad} from './stores.js';


class ReactiveSingleton
{
	subscriptions:Array<((x:Array<N3.Quad>) => void)> = [];
	value: any;

	constructor(s,p,g)
	{
		indexes.subscribe((v) =>
		{
			let os = q(q(v['spgo'][s],p),g);
			if (os.length > 1)
				throw 666;
			if (os.length === 0)
				this.value = undefined
			else
				this.value  = os[0]
			fire()
		}
	}

	set(new_value)
	{
		this.value = new_value;
		set_singleton_quad(presenter_uri, 'presentation_selector_visible', '@default', !visible);
	}

	fire()
	{
		this.subscriptions.forEach((subscription) => subscription(this.value));
	}

	subscribe(subscription: (value: any) => void): (() => void)
	{
		subscription(this.value);
		this.subscriptions.push(subscription);
		return (() => {this.subscriptions = this.subscriptions.filter((x) => {x !== subscription})});
	}
}


