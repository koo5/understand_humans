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

</script>
