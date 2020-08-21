<script>

	/*

this will be set up with an implicit quads kb (svelte context)

implement these domain-specific types:

	request
		results

	result
		alerts
		reports

	alerts
		alert
			severity

	reports
		report
	...


ideal architecture:

	frontend (svelte app)
		|
	websocket
		|
	triplestore (agraph)

in reality, there isnt any GraphQL* yet, so, probably no websockets, just polling.
Server will be responsible for providing a rdf file where all triples relevant to a request are. Everything that is a part of one graph.

*/


	class Var
	{
		constructor()
		{
			this.value = null;
		}

		function

		* bind(value)
		{
			if (this.value === value)
				yield true;
			else if (this.value === null)
			{
				this.value = value;
				yield true;
				this.value = null;
			}
		}

	}

	function* vars()
	{
		while (true)
			yield new Var();
	}


	function graph(thanks

	rdfq
	top
	graph
	Returns

	function q

	.

	S
	p
	o
	g,
	G - super
	is - supergraph - of
	g
	default,
	=>
	S
	p
	o
	G - super.g
	is - supergraph - of
	g
	default.

	G - super
	is - supergraph - of
	g
	default <
	=
		G - super
	contains
	x
	default,
	x
	is - supergraph - of
	g
	default.


	Class
	Rdfq - supergraph
	is
	a
	view
	onto
	the
	store, that
	filters
	quads
	by
	their
	inclusion in a
	given
	graph.class
	Rdfq_supergraph
	{
		constructor(store, supergraph)
		{
			this.store = store;
			this.supergraph = supergraph;
		}

		function* quads(s, p, o, g)
		{
			for (_ of store.quads(s, p, o, g))
			{
				if (this.supergraph
					}
		}
	}

	let fq = new Rdfq_supergraph(':default');
	fq.q(s, p, o, g).forEach(([s, p, o, g]) =>
	{

	}


	is - supergraph - of
	g


	function view(uri)
	{
		return view_domain_specific_type(uri)
			|| view_generic_type(uri);
	}

	function view_domain_specific_type(uri)
	{
		view_type('ldit:alert', uri)
		||

	}

	/* note this function. The template/method chosen to display a particular iri is ..*/
	function view_type(

	'ldit:alert', uri
	)
	{
		q(uri, 'a', ldit
	:
		alert, g
	).
		map((g) =>
			graph(g, q(uri, 'ldit:key', key, g5).map(() =>
				graph(g5, [span(key), ':', view_type('ldit:alert_value', val)]))));
	}

	function view_generic_type(uri)
	{
		return '?'
	}


	/*
	a very simplistic Rdfq implementation
	* no reasoning is performed
	* acts as a passthrough to the store
	* only properties of triple-id's themselves are taken into account
	* all triples in the store are assumed to be a part of the implicit supergraph
	 */
	class Simple_rdfq
	{
		constructor(store)
		{
			this.store = store;
		}

		function

		* q(s, p, o, g)
		{
			while store.q(s, p, o, g)
				yield true;
		}
	}


</script>
