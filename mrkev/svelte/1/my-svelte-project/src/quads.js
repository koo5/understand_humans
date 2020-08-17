	export class Literal {

	}

	export class Suri
	{
		constructor(prefix, name=undefined)
		{
			if(arguments.length == 1)
				[prefix, name] = prefix.split(':');
			this.prefix = prefix;
			this.name = name;
		}
		toString()
		{
			return this.prefix + ":" + this.name;
		}
	};

	/* full URI */
	export class Furi {
		constructor(uri) {
			this.uri = uri;
		}
	};

	export class Quad
	{
		constructor(subject,p,o,g)
		{
			this.spog = [subject,p,o,g];
			console.log('Quad constructed:');
			console.log(this);

		}
		get s(){return this.spog[0]};
		set s(x){
			console.log('s setter this:');
			console.log(this);
			if (typeof(x) == "string")
				x = normalize_suri_furi(parse_rdf_node(x))
			this.spog[0] = x;
		}
	}

	export function rdf_node_parsing_result(x) {
		r = parse_rdf_suri(x);
		errors = [];
		if ('ok' in r) return r;
		errors.push(r.error)
		r = parse_rdf_furi(x)
		if ('ok' in r) return r;
		errors.push(r.error)
		r = parse_rdf_literal(x);
		if ('ok' in r) return r;
		errors.push(r.error)
		return {'errors':errors}
	}

	function parse_rdf_furi(x)
	{
		const re = /^<(.*)>$/;
		const m = x.match(re);
		if (m.length != 2)
			return null
		return Furi(m[1]);
	}


	//Quad.prototype.s = function(){this.spog[0]};
	Quad.prototype.p = function(){this.spog[1]};
	Quad.prototype.o = function(){this.spog[2]};
	Quad.prototype.g = function(){this.spog[3]};
