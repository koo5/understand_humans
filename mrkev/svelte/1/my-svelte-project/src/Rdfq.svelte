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

<script>

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

    function view_type('ldit:alert', uri)
    {
        q(uri, 'a', ldit:alert, g).map((g)=>
            graph(g, q(uri, 'ldit:key', key, g5).map(()=>
                graph(g5, [span(key),':',view_type('ldit:alert_value', val)]))));
    }

    function view_generic_type(uri)
    {
        return '?'
    }



</script>
