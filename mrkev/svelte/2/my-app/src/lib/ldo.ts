export class Ldo
{
	constructor(ctx)
	{
		this._ctx = ctx;
	}
	function save(seen)
	{
		if (this in seen)
			return;

	}
}
