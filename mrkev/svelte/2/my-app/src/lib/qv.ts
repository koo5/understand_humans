

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

