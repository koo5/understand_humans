:- module(_, []).

:- use_module(ldl).
:- use_module(utils).

/*
todo: string escape sequence handling
probably introduce lists, or at least one_or_more_separated_with. zero_or_more_separated_with dosent work, because a single item is ambiguously both a grammar_item and a sequence.

*/

/* 
	grammar representations:
		wrapped is the lowest level format, used in the parser.
			- compound terms, s() and a() for easy pattern matching
		unwrapped
			- compound terms, but no s() and a(), strings and atoms stand for themselves. This is the format that bootstrap0 grammar is defined in in prolog code here.
		expandded
			- everything is turned into nodes, as would be obtained by parsing the grammar from text. The only difference is that dicts are used instead of lists of pairs.
			- lists become a:zero_or_more_separated_with, strings become a:string_literal
		lists
			- the dicts are turned into lists, which is the current actual ast format that the parser produces/uses
*/


:- assert(hobbylog0([
	module_body ++> zero_or_more_separated_with(top_level_item, ''),
	top_level_item ++> whitespace,
	top_level_item ++> comment,
	top_level_item ++> [clause, whitespace+, ".", whitespace+],
	clause ++> directive,
	goal ++> [":-", whitespace+, body:term],
	clause ++> fact,
	fact ++> [body:term],
	clause ++> rule,
	rule ++> [head:term, whitespace+, ":-", whitespace+, body:term],
	
	

:- assert(bootstrap0([

	module_body ++> zero_or_more_separated_with(top_level_item, newline)
		<< ["x ++> \"\\n\".", "x ++> b.", "x ++> b.\nx ++> b.", "x ++> b.\nccc ++> zero or more \"a\" separated with \"b\".", "x ++> b.\nccc ++> zero or more identifier separated with \" \".", "x ++> b.\nccc ++> zero or more identifier separated with \"\\n\"."],
	
	newline ++> "\n"
		<< ["\n"],
	
	top_level_item ++> ""
		<< [""],
	top_level_item ++> transformed_by(statement_with_period, statement_from_parse_tree)
		<< ["x ++> b."],
	top_level_item ++> comment
		<< ["#abc"],
	comment ++> ["#", zero_or_more_separated_with(comment_char, "")]
		<< ["#abc"],
	comment_char ++> any_char_except("\n")
		<< ["a", "b"],

	statement_with_period ++> [statement, "."]
		<< ["x ++> b."],

	statement ++> grammar
		<< ["x ++> b"],
	grammar ++> [lhs:identifier, " ++> ", rhs:rhs]
		<< ["x ++> [a, b]", "raw_string_literal_body_item ++> any char except \"\\n\\\"\\\\\""],
	rhs ++> transformed_by(rhs_list, rhs_list_from_parse_tree),
	rhs_list ++> ["[", zero_or_more_separated_with(grammar_item, ", "), "]"],
	rhs ++> grammar_item,

	grammar_item ++> with_name,
	with_name ++> [name:identifier, ":", type:grammar_item]
		<< ["x:b"],

	grammar_item ++> zero_or_more_separated_with,
	zero_or_more_separated_with ++> ["zero or more ", item:grammar_item, " separated with ", separator:grammar_item]
		<< ["zero or more \"a\" separated with \"b\""],

	grammar_item ++> all_chars_until_one_of,
	all_chars_until_one_of ++> ["all chars until one of ", string_literal],
	
	grammar_item ++> any_char_except,
	any_char_except ++> ["any char except ", string_literal]
		<< ["any char except \" \"", "any char except \"string_literal\""],

	grammar_item ++> transformed,
	transformed ++> [node_type, " transformed by ", transformer:identifier],
	
	grammar_item ++> node_type,
	node_type ++> identifier,
	identifier ++> [transformed_by(raw_identifier, identifier_from_parse_tree)]
		<< ["a", "abc", ~"a:\n"],
	raw_identifier ++> [head:valid_identifier_char, rest:zero_or_more_separated_with(valid_identifier_char, "")]
		<< ["a", "abc", ~"a:\n"],		
	valid_identifier_char ++> any_char_except("\n\"\\,.: []")
		<< ["x", ~"\n"],

	grammar_item ++> string_literal,
	string_literal ++> [transformed_by(raw_string_literal, string_from_parse_tree)]
		<< ["\"\\n\"", "\"rsitens\"", "\"x\\\\\""],
	raw_string_literal ++> ["\"", raw_string_literal_body, "\""]
		<< ["\"x\"", "\"x\\\\\"", "\"rsitens\"", ~"\"rsitens", ~"\"\"rsitens\"", ~"\"rsitens\"\""],
	raw_string_literal_body ++> zero_or_more_separated_with(transformed_by(raw_string_literal_body_item, raw_string_literal_body_item_transformer), "")
		<< ["x", "\\\\", "wftni\\\\strs\\\"", "rsitens", ~"\n"],

	raw_string_literal_body_item ++> any_char_except("\n\"\\"),
	raw_string_literal_body_item ++> "\\\"",
	raw_string_literal_body_item ++> "\\\\",
	raw_string_literal_body_item ++> "\\n"
		<< ["\\n", ~"\nsts"]
])).


/*

*/
	
extract_examples((Grammar << Examples), Grammar, (Lhs: Examples)) :- 
	Grammar = (Lhs ++> _Rhs),
	assertion(atom(Lhs)),
	assertion(is_list(Examples)).
	
extract_examples(Grammar, Grammar, []) :- Grammar = (_ ++> _).


/*
	wrap strings and atoms in s() and a(), for more straightforward pattern matching
*/

wrap([], []).
wrap(C, C2) :- 
	compound(C),
	C =.. [Functor|Args],
	maplist(wrap, Args, Args2),
	C2 =.. [Functor|Args2].
wrap(C, C2) :- 
	compound(C2),
	C2 =.. [Functor|Args2],
	maplist(wrap, Args, Args2),
	C =.. [Functor|Args].
wrap(S, s(S)) :- string(S).
wrap(A, a(A)) :- atom(A).


/*
	expand Bootstrap into a proper grammar as would be obtained by parsing.
*/

expanded(
	X, 
	n([a-zero_or_more_separated_with, items-l(I)])
) :-
	maplist(expanded, X, I).
	
expanded(
	Name:Type, 
	n([a-with_name, children-ch([name-Name2, type-Type2])])
) :-
	expanded(Name, Name2),
	expanded(Type, Type2).

expanded(
	Lhs ++> Rhs, 
	n([a-grammar, children-ch([lhs-Lhs2, rhs-Rhs2])])
) :-
	expanded(Lhs, Lhs2),
	expanded(Rhs, Rhs2).

expanded(
	zero_or_more_separated_with(Item, Separator), 
	n([a-zero_or_more_separated_with, children-ch([item-Item2, separator-Separator2])])
) :-
	expanded(Item, Item2),
	expanded(Separator, Separator2).

expanded(
	transformed_by(Spec, Pred), 
	n([a-transformed, children-ch([node_type-Spec2, transformer-Pred2])])
) :-
	expanded(Spec, Spec2),
	expanded(Pred, Pred2).

expanded(
	any_char_except(X), 
	n([a-any_char_except, children-ch([string_literal-X2])])
) :-
	expanded(X, X2).

expanded(
	X, 
	n([a-identifier, children-ch([0-S])])
) :-
	(var(X) -> true ; atom(X)),
	atom_string(X, S).

expanded(
	X, 
	n([a-string_literal, children-ch([0-X])])
) :-
	(var(X) -> true ; string(X)).



prepare_bootstrap0_and_examples :-
	bootstrap0(Bootstrap0),
	% writeln("Bootstrap0:"),	maplist(ldl:print_stuff, Bootstrap0),
	
	maplist(extract_examples, Bootstrap0, Grammar0, Examples),
	wrap(Grammar0, Grammar),
	% writeln("Grammar:"), ldl:print_stuff(Grammar),
	
	% writeln("Examples list:"), ldl:print_stuff(Examples),
	flatten(Examples, Examples2),
	utils:list_of_pairs_with_duplicate_keys_to_dict(Examples2, Examples_Dict),
	% writeln("Examples:"), ldl:print_stuff(Examples_Dict),
	
	assert(bootstrap0(Grammar, Examples_Dict)).

retract_all_grammar :- retractall(bootstrap0/1),retractall(bootstrap0/2).
	
:- begin_tests(bootstrap0, [
	setup(prepare_bootstrap0_and_examples), 
	cleanup(retract_all_grammar)]).



test(autocompletion0, []) :-%gtrace,
	test_autocompletion(a(grammar), 'Text_So_Far').
test(autocompletion1, []) :-
	test_autocompletion(a(module_body), 'Text_So_Far ++').
	
test_autocompletion(K, Text_So_Far) :-
	bootstrap0(G, _),
	findall(
		_,
		(
			write('autocompleting '), writeq(Text_So_Far), write(' as '), writeq(K), writeln(':'),
			string_codes(Text_So_Far, Codes0),
			append(Codes0, Rest, Codes),
			ldl:parse(G, K, Codes, [], Ast),
			/*(nonvar(Codes) -> string_codes(S, Codes) ; S = 0),*/
			/*writeq(S), Ast=Ast, */writeq(Rest), write(': '), writeq(Ast), nl
		),
		_
	).
	

test(zero_or_more_separated_with0, all(Ast=[_])) :-
	ldl:parse([], zero_or_more_separated_with(s("a"), s("")), [97], [], Ast, 5).
test(zero_or_more_separated_with0, all(Ast=[_])) :-
	ldl:parse([], zero_or_more_separated_with(s("a"), s("")), [97,97], [], Ast, 5).
test(zero_or_more_separated_with0, all(Ast=[_])) :-
	ldl:parse([], zero_or_more_separated_with(s("a"), s("b")), [97,98,97], [], Ast, 5).
test(zero_or_more_separated_with0, all(Ast=[_])) :-
	\+ldl:parse([], zero_or_more_separated_with(s("a"), s("b")), [97,98], [], Ast, 5).
test(zero_or_more_separated_with0, all(Ast=[_])) :-
	\+ldl:parse([], zero_or_more_separated_with(s("a"), s("b")), [98], [], Ast, 5).
test(zero_or_more_separated_with0, all(Ast=[_])) :-
	\+ldl:parse([], zero_or_more_separated_with(s("a"), s("b")), [97, 97], [], Ast, 5).
test(zero_or_more_separated_with0, all(Ast=[_])) :-
	ldl:parse([], zero_or_more_separated_with(s("a"), s("b")), [], [], Ast, 5).
test(0, all(D=[_{a:[], b:[1,2]}])) :-
	utils:list_of_pairs_with_duplicate_keys_to_dict([a:[], b:[1], a:[], b:[2]], D).


test(single_testcase, []) :-
	writeln(single_testcase),
	bootstrap0(G, _), 
	
	K = a(grammar),
	Ast = n([ a - grammar,
    children - ch([ (lhs - n([a-identifier,children-ch([0-"raw_identifier"])])),
         (rhs - n([ (a - zero_or_more_separated_with),
             (items - l([ n([ (a - with_name),
                     (children - ch([ (type - n([ (a - identifier),
                              (children - ch([0-"valid_identifier_char"]))
                            ])),
                          (name - n([a-identifier,children-ch([0-"head"])]))
                        ]))
                   ]),
                 n([ (a - with_name),
                     (children - ch([ (type - n([ (a - zero_or_more_separated_with),
                              (children - ch([ (item - n([ (a - identifier),
                                       (children - ch([0-"valid_identifier_char"]))
                                     ])),
                                   (separator - n([ (a - string_literal),
                                       (children - ch([0-""]))
                                     ]))
                                 ]))
                            ])),
                          (name - n([a-identifier,children-ch([0-"rest"])]))
                        ]))
                   ])
               ]))
           ]))
       ])
  ]),

	findall(Linearization,ldl:linearize(G, K, Ast, Linearization),Linearizations),
	writeln(Linearizations),
	true.	

	
	/*
	K = a(grammar),
	Text = "x ++> a, b",
	ldl:all_parses(G, K, Text, Parses),
	utils:close_lists_recursively(Parses),
	writeq(Parses),nl,nl,
	*/	
	%Ast =  n([a-grammar,children-ch([lhs-n([a-identifier,children-ch([0-"x"])]),rhs-n([a-zero_or_more_separated_with,items-l([n([a-identifier,children-ch([0-"a"])]),n([a-identifier,children-ch([0-"b"])])])])])]),

	
e(K, E) :-
	bootstrap0(_, All_Examples), 
	
	%K = grammar,
	/*
	K = module_body,
	E = "x ++> b.\nx ++> b.",
	*/
	
	Examples = All_Examples.get(K),
	member(E, Examples).

test('examples embedded in grammar', [
		all(Choice=[x]),
		forall(e(K0, Test_Term))
	]
) :-
	writeln('examples embedded in grammar'),
	Choice=x,
	K = a(K0),
	bootstrap0(G, _), 
	(
		Test_Term = ???Test_Spec
	->
		(
			E = Test_Spec
			,gtrace
		)
	;
		E = Test_Term
	),
	(
		E = ~X
	->
		(
			writef('%w should not parse %t...\n', [K, X]),
			ldl:all_parses(G, K, X, Parses),
			assertion(Parses=[])
		)
	;
		(
			writef('%w should parse %t...\n', [K, E]),%gtrace,
			ldl:all_parses(G, K, E, Parses),
			utils:close_lists_recursively(Parses),
			write('result: '),
			utils:print_stuff(Parses),nl,
			Parses=[P],
			
			%gtrace,

			%(K = a(grammar) -> gtrace ; true),
			abolish_all_tables,
			ldl:linearize(G, K, P, Linearization),
			%(K = a(grammar) -> gtrace ; true),
			
			writef('linearization: %t\n\n', [Linearization]),
			ldl:all_parses(G, K, Linearization, Parses2),
			utils:close_lists_recursively(Parses2),
			assertion(Parses == Parses2),
		
			true
		)
	).


test('bootstrap grammar linearization', [all(Choice=[x])]) :-
	linearize_current_grammar_with_itself(Linearization0),
	parse_and_assert_new_grammar(Linearization0),
	linearize_current_grammar_with_itself(Linearization0),
	Choice=x.

:- end_tests(bootstrap0).

linearize_current_grammar_with_itself(Linearization) :-
	nl,nl,nl,
	bootstrap0(G_Wrapped, _Examples), 
	wrap(G_Unwrapped, G_Wrapped),
	expanded(G_Unwrapped, G_Lists),
	expanded(G_Unexpanded, G_Lists),
	G_Unexpanded = G_Unwrapped,
	G_Lists = n([a-zero_or_more_separated_with, items-l(G_Lists_Items)]),
	findall(_,(
		member(X, G_Lists_Items),
		assertion(
			(
				%gtrace,
				write('linearizing grammar part '), print_term(X,[]),nl,
				ldl:linearize(G_Wrapped, a(grammar), X, String),
				write('result:'), writeq(String), nl
			)
		)
	),_),
	nl,
	writeln('and whole grammar...'),
	test_whole_grammar_linearization(G_Wrapped, G_Lists, Linearization).

test_whole_grammar_linearization(G, Ast, Linearization) :-
	findall(
		Linearization, (
		ldl:linearize(G, a(module_body), Ast, Linearization),
		write('Linearization:'), writeq(Linearization), nl,nl,
		writeln(', printed:'),nl, writeln(Linearization),nl
		),
	[Linearization]).

parse_and_assert_new_grammar(Linearization) :-
	bootstrap0(Old_G, _), 
	ldl:all_parses(Old_G, a(module_body), Linearization, Parses),	
	[P] = Parses,
	utils:close_lists_recursively(P),
	%gtrace,
	retract_all_grammar,
	expanded(Contracted, P),
	wrap(Contracted, Wrapped),
	assert(bootstrap0(Wrapped, _{})).
