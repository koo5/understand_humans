import {get} from 'svelte/store';
import {try_to_shorten_uri, expand_prefix} from './prefixes.ts';

import * as n from 'n3';
export const df = n.DataFactory;

export const M = "https://rdf.lodgeit.net.au/mrkev#";
export const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
export const URI_HIERARCHICAL_NOTES = M + 'hierarchical_notes';
export const URI_PLAINTEXT = M + 'plain_text';




export function suri(prefix, suffix)
{
	const result = maybe_namednode_from_prefix_and_suffix(prefix, suffix)
	if (result.errors)
		throw result.errors;
	return result.value;

}

function maybe_namednode_from_prefix_and_suffix(prefix, suffix)
{
	const expanded_prefix = expand_prefix(prefix)
	if (expanded_prefix === undefined)
		return {errors: ['failed to expand prefix "' + prefix + '"']};
	const iri = expanded_prefix + postfix
	return {value: df.namedNode(iri)}
}

export function parse_rdf_node(x)
{
	const r = rdf_node_parsing_result(x);
	if ('errors' in r)
		throw r;
	else
		return r.value;
}

export function rdf_node_parsing_result(x, options)
{
	x = x.trim()

	if (!x)
		return {'errors': [{'errors':['empty input']}]}

	const parser_funcs =
		[
			parse_rdf_suri, parse_rdf_furi,parse_rdf_furi_bare,
			parse_rdf_singlequote_literal, parse_rdf_doublequote_literal,
			parse_rdf_default_graph
		];
	/*todo
	if (options['allow_variable'] != false)
		parser_funcs.push(parse_rdf_variable)
	if (options['allow_bnode'] != false)
		parser_funcs.push(parse_rdf_bnode)
	*/
	//todo Literal with datatype or language
	//use n.termFromId(x) maybe?

	const results = parser_funcs.map((f) => f(x));
	const values = results.filter(r => 'value' in r);
	if (values.length == 1)
		return values[0];
	else if (values.length > 1)
		return {'errors': ['ambiguous parse' + values]}

	const errors = results.filter(r => 'errors' in r);
	return {'errors': errors}
}

export function rdf_node_textual_representation(x)
{
	if (x.termType == 'NamedNode')
		return try_to_shorten_uri(x.value) || ('<' + x.value + '>');
	if (x.termType == 'Literal')
		return '"' + x.value + '"';
	if (x.termType == 'DefaultGraph')
		return 'default graph!'
	if (x.termType == 'BlankNode')
		return "_:" + x.value
	return "some " + x.termType
}

function parse_rdf_default_graph(x)
{
	if (x == 'default graph!')
		return {value: new df.defaultGraph()};
	return {errors: ['is not: "default graph!"']}
}

/*
N3 grammars:
https://www.w3.org/2000/10/swap/rdfn3.g
*/
function parse_rdf_furi(x)
{
	const re = /^<(.*)>$/;
	const m = x.match(re);
	if (m === null)
		return {errors: ['does not match full uri regex pattern: ' + re]}
	return {value: new df.namedNode(m[1])};
}

function parse_rdf_furi_bare(x)
{
	const re = /^([a-zA-Z][a-zA-Z0-9_-]*)$/;
	const m = x.match(re);
	if (m === null)
		return {errors: ['does not match full uri regex pattern: ' + re]}
	return {value: new df.namedNode(m[1])};
}

function parse_rdf_suri(x)
{
	const re = /^([a-zA-Z][a-zA-Z0-9_-]*)?:([a-zA-Z0-9_-]+)$/;
	const m = x.match(re);
	if (m === null)
		return {errors: ['does not match qname regex pattern: ' + re]}
	if (m[1] === undefined)
		m[1] = '';
	return maybe_namednode_from_prefix_and_suffix(m[1], m[2])
}

function parse_rdf_singlequote_literal(x)
{
	const re = /^'([^\"\\\n]|\\[\\\"nrt])*'$/;
	const m = x.match(re);
	if (m === null)
		return {errors: ['does not match string literal regex pattern: ' + re]}
	return {value: new df.literal(m[1])}
}

function parse_rdf_doublequote_literal(x)
{
	const re = /^"([^\"\\\n]|\\[\\\"nrt])*"$/;
	const m = x.match(re);
	if (m === null)
		return {errors: ['does not match string literal regex pattern: ' + re]}
	return {value: new df.literal(m[1])}
}

export function generate_unique_uri(suffix = "uri")
{
	return new df.namedNode("uri_" + (++last_unique_uri_number).toString() + "_" + suffix);
}

