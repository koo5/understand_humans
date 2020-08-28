	/*
	a very simplistic Rdfq implementation
	* no reasoning is performed
	* acts as a passthrough to the store
	* only properties of triple-id's themselves are taken into account
	* all triples in the store are assumed to be a part of the implicit supergraph
	 */

	/*
	usage is as follows: create Mock_rdfq with a store of your choice. Supergraph is omitted. All triples in the store are assumed to be a part of the supergraph that you want to query.
	Query with q(s,p,o,g). The g you get is not the Supergraph uri, but rather the id of the triple. Then you simply query your store for properties of the id.

	 */


	class Mock_rdfq
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




