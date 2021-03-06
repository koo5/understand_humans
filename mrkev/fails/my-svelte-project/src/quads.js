
export class Literal
	{
		constructor(value)
		{
			this.value = value;
		}
		toString()
		{
			return '"' + this.value + '"';
		}
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
		toString()
		{
			return '<' + this.uri + '>';
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
		get p(){return this.spog[1]};
		get o(){return this.spog[2]};
		get g(){return this.spog[3]};
		set s(x){
			console.log('s setter this:');
			console.log(this);
			if (typeof(x) == "string")
				x = normalize_rdf_node(parse_rdf_node(x));
			this.spog[0] = x;
		}
		set p(x){
			console.log('p setter this:');
			console.log(this);
			if (typeof(x) == "string")
				x = normalize_rdf_node(parse_rdf_node(x));
			this.spog[1] = x;
		}
		set o(x){
			console.log('o setter this:');
			console.log(this);
			if (typeof(x) == "string")
				x = normalize_rdf_node(parse_rdf_node(x));
			this.spog[2] = x;
		}
		set g(x){
			console.log('g setter this:');
			console.log(this);
			if (typeof(x) == "string")
				x = normalize_rdf_node(parse_rdf_node(x));
			this.spog[3] = x;
		}
		toString()
		{
			return '' + this.s + ' ' + this.p + ' ' + this.o + ' ' + this.g + ' .';
		}

	}

	export function normalize_rdf_node(x)
	{
		return x;
	}

	export function parse_rdf_node(x) {
		const r = rdf_node_parsing_result(x);
		if ('errors' in r)
			throw r;
		else {
			return r.value;
		}
	}

	export function rdf_node_parsing_result(x) {
		let errors = [];
		const parser_funcs =
		[
			parse_rdf_suri,parse_rdf_furi,
			parse_rdf_singlequote_literal,parse_rdf_doublequote_literal

		];
		const results = parser_funcs.map((f) => f(x));
		const values = results.filter(r=>'value' in r);
		if (values.length == 1)
			return values[0];
		else if (values.length > 1)
			return {'errors':['ambiguous parse' + values]}
		else {
			const errors = results.filter(r=>'errors' in r);
			return {'errors': errors}
		}
	}

	/*
	https://www.w3.org/2000/10/swap/rdfn3.g
	 */

	function parse_rdf_furi(x)
	{
		const re = /^<(.*)>$/;
		const m = x.match(re);
		if (m === null)
			return {errors:['does not match full uri regex pattern: ' + re]}
		return {value:new Furi(m[1])};
	}

	function parse_rdf_suri(x)
	{
		const re = /^([a-zA-Z][a-zA-Z0-9_-]*)?:([a-zA-Z0-9_-]+)$/;
		const m = x.match(re);
		if (m === null)
			return {errors:['does not match qname regex pattern: ' + re]}
		if (m[1] === undefined)
			m[1] = '';
		return {value:new Suri(m[1], m[2])};
	}

	function parse_rdf_singlequote_literal(x)
	{
		const re = /^'([^\"\\\n]|\\[\\\"nrt])*'$/;
		const m = x.match(re);
		if (m === null)
			return {errors:['does not match string literal regex pattern: ' + re]}
		return {value:new Literal(m[1])}
	}
	function parse_rdf_doublequote_literal(x)
	{
		const re = /^"([^\"\\\n]|\\[\\\"nrt])*"$/;
		const m = x.match(re);
		if (m === null)
			return {errors:['does not match string literal regex pattern: ' + re]}
		return {value:new Literal(m[1])}
	}

