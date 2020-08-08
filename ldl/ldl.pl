:- module(_, [
	op(10, xfx, transformed_by),
	op(888, xfx, '<<'),
	op(9, xfx, '++>'),
	op(11, fx, '~'),
	op(11, fx, '???')
]).

:- use_module(utils).
:- use_module(library(http/json)).

/*
	take a grammar and parse some text or linearize some ast
*/	
	
:- discontiguous(parse/6).

print_tabling_tables :-
	writeln("ROUND"),
	findall(
		_,
		(
			current_table(Variant, Trie),
			print_term((Variant, Trie), []), nl,nl
		),
		_
	),nl,nl,nl.

%:- table(parse(_,_,_,_,first)).

parse(G, Spec, In, Out, Node) :- 
	print_node(Node),
	catch_with_backtrace(
		parse0(G, Spec, In, Out, Node, 2),
		Error,
		print_message(error, Error)).

parse0(G, Spec, In, Out, Node, Gas) :-
/*		(var(In),var(Node))
	->
		Node = n([a-hole, type-Spec])
	;*/
		parse(G, Spec, In, Out, Node, Gas).	
	
	
parse(G, a(Spec), In, Out, Node, Gas) :-
	Gas > 0,
	%writeq((a(Spec), In, Out, Node)),nl,
	(var(Spec),(var(In),var(Node)) -> fail ; true),
	((var(In),var(Node)) -> New_Gas is Gas - 1 ; New_Gas is Gas),
	%print_tabling_tables,
	(acyclic_term((Spec, In, Out, Node))->true;throw(err)),

	((var(Spec), Node=n(Ast)) -> memberchk(a-Spec, Ast) ; true),
	member(a(Spec) ++> Y, G),
	(
		is_list(Y)
	->
		(
			Node = n(Ast),
			memberchk(a-Spec, Ast),
			memberchk(children-ch(Children), Ast),
			parse_rhs_list(G, Y, In, Out, Children, 0, New_Gas)
		)
	;
		parse(G, Y, In, Out, Node, Gas)
	).

parse(_, s(X), In, Out, Codes, _Gas) :-
	(nonvar(X) -> string_codes(X, Codes) ; true),
	parse_chars(Codes, In, Out),
	(var(X) -> string_codes(X, Codes) ; true).

	
parse_chars([], In, In).
	
parse_chars([Code|Codes], [Code|Mid], Out) :-
	parse_chars(Codes, Mid, Out).

	
parse_rhs_list(_, [], In, In, _, _, _).

parse_rhs_list(G, [H|T], In, Out, Children, Free_Child_Idx, Gas) :-
	(H = a(Name):Spec -> true
	; (H = a(Name) -> Spec = H
		; (Name = Free_Child_Idx, Spec = H))),
	(
		Spec = s(_)
	-> 
		Next_Free_Child_Idx is Free_Child_Idx 
	;
		(
			Next_Free_Child_Idx is Free_Child_Idx + 1,
			(memberchk(Name-Child, Children)
				-> true
				; (gtrace,throw("child name mismatch"))
			)
		)
	),
	parse0(G, Spec, In, Mid, Child, Gas),
	parse_rhs_list(G, T, Mid, Out, Children, Next_Free_Child_Idx, Gas).
	
parse(_, any_char_except(s(Exceptions)), [In_H|T], T, Code, _Gas) :- 
	nonvar(Exceptions),
	string_codes(Exceptions, Exceptions_Codes),
	(
		var(In_H)
	->
		true
	;
		\+member(In_H, Exceptions_Codes)
	),
	Code = In_H,
	(var(Code) -> string_codes("X", [Code]);true),
	integer(Code).

not_parse(G, Spec, In, Out, Node, Gas) :- 
	\+parse(G, Spec, In, Out, Node, Gas).

not_separator_and_item(G, Spec, In, Out, Node, Gas) :-
	\+separator_and_item(G, Spec, In, Out, Node, Gas).

parse(G, zero_or_more_separated_with(X, _), In, In, n([a-zero_or_more_separated_with, items-l([])]), Gas) :- 
	var(In) -> true ; not_parse(G, X, In, _, _, Gas).

parse(G, zero_or_more_separated_with(Spec, Sep), In, Out, n([a-zero_or_more_separated_with, items-l(List)]), Gas) :-
	((var(In),var(List)) -> New_Gas is Gas - 1 ; New_Gas is Gas),
	List = [Item|Items],
	parse0(G, Spec, In, Mid0, Item, New_Gas),
	items_rest(G, zero_or_more_separated_with(Spec, Sep), Mid0, Out, Items, New_Gas).

	
items_rest(G, X, In, In, [], Gas) :-
	var(In) -> true ; not_separator_and_item(G, X, In, _, _, Gas).
	
items_rest(G, X, In, Out, [Item|Items], Gas) :-
	((var(In),var(Items)) -> New_Gas is Gas - 1 ; New_Gas is Gas),
	separator_and_item(G, X, In, Mid, Item, Gas),
	items_rest(G, X, Mid, Out, Items, New_Gas).	

	
separator_and_item(G, zero_or_more_separated_with(Spec, Sep), In, Out, Item, Gas) :-
	parse(G, Sep, In, Mid0, _, Gas),
	parse(G, Spec, Mid0, Out, Item, Gas).
	
parse(G, transformed_by(Spec, a(Pred)), In, Out, Ast, Gas) :-
	var(Ast),
	parse0(G, Spec, In, Out, Ast0, Gas),
	transform(Pred, Ast, Ast0).
	
parse(G, transformed_by(Spec, a(Pred)), In, Out, Ast, Gas) :-
	nonvar(Ast),
	transform(Pred, Ast, Ast0),
	parse0(G, Spec, In, Out, Ast0, Gas).

is_hole(X) :-
	member(a-hole, X).
	
has_hole(n(N)) :-
	%writeq(has_hole(n(N))),
	(
		is_hole(N)
	;
		(/*writeq('1..'),*/member(children-ch(Children), N), member(_-Ch, Children), has_hole(Ch))
	;
		(/*writeq('1..'),*/member(items-l(List), N), member(Ch, List), has_hole(Ch))
	).
		
:- meta_predicate transform(3, ?, ?).

transform(Pred, Ast, Ast0) :-
	(
		(Ast = Ast0, utils:close_lists_recursively(Ast), once(has_hole(Ast)))
	->
		true
	;
		(
			Known_Transformers = [ldl:string_from_parse_tree, ldl:identifier_from_parse_tree, ldl:statement_from_parse_tree, ldl:rhs_list_from_parse_tree, ldl:raw_string_literal_body_item_transformer],
			(
				nonvar(Pred)
			->
				(
					member(Pred, Known_Transformers)
				->
					true
				;(gtrace,
					throw("unknown transformer"))
				)
			;
				true
			),
			member(Pred, Known_Transformers),
			call(Pred, Ast, Ast0)
		)
	).

/*
	this is one of the messier parts, due to representing ast nodes with open and closed lists.
	X is abstract, Y is concrete.
	going from abstract to concrete, we have to create a list that's exactly how the parsed node would be. Order of "keys" matters. 
	(nonvar(X) -> utils:close_lists_recursively(Y) ; true) closes the created list if going from abstract to concrete.
	
	if going from concrete to abstract, we flatten out nested lists which are really embedded raw_string_literal_body_item nodes. This is symmetrized by any_char_except not checking that char is not in the exceptions list when linearizing.
	This allows us to simply specify, for example, "\\n" on the abstract side, string_codes it into [92, 110], and have it linearize succesfully, while propertly it should be specified as [[92], 110], which could be computationally infeasible to come up with from the string. Probably this can be reviewed if we add some strcture around string literals.	
*/	
	
string_from_parse_tree(X, n(Y)) :-
	%writeq((string_from_parse_tree, X, Y)),nl,
	memberchk(a-raw_string_literal, Y),
	memberchk(children-ch(Ch), Y),
	memberchk(raw_string_literal_body-n(Seq), Ch),
	memberchk(a-zero_or_more_separated_with,Seq),
	memberchk(items-l(Codes), Seq),
	(nonvar(X) -> utils:close_lists_recursively(Y) ; true),
	(
		var(Codes)
	->
		Z = Codes
	;
		flatten(Codes, Z)
	),
	(nonvar(X) -> string(X) ; true),
	string_codes(X, Z).

identifier_from_parse_tree(X, n(Y)) :-
	%writeq((identifier_from_parse_tree, X, Y)),nl,
	memberchk(a-raw_identifier, Y),
	memberchk(children-ch(Ch), Y),
	memberchk(head-H, Ch),
	memberchk(rest-n(R), Ch),
	memberchk(a-zero_or_more_separated_with,R),
	memberchk(items-l(Codes), R),
	(nonvar(X) -> utils:close_lists_recursively(Y) ; true),
	(nonvar(X) -> string(X) ; true),
	string_codes(X, [H|Codes])
	%,writeq((okidentifier_from_parse_tree, X, Y)),nl
	.

statement_from_parse_tree(X, n(Y)) :-
	memberchk(a-statement_with_period, Y),
	memberchk(children-ch(Ch), Y),
	memberchk(statement-X, Ch),
	(nonvar(X) -> utils:close_lists_recursively(Y) ; true).
	
rhs_list_from_parse_tree(n(X), n(Y)) :-
	%writeq(X), nl,
	Y = [
		a - rhs_list, 
		children - ch([0-n(X)])
	],
	%,writeq(Y), nl,
	true.
	
raw_string_literal_body_item_transformer(92, [92,92]).
raw_string_literal_body_item_transformer(10, [92,110]).
raw_string_literal_body_item_transformer(34, [92,34]).
raw_string_literal_body_item_transformer(X, X) :- 
	\+member(X, [92,10,34]),X \= [_|_].
	
	%write('RRR'), writeq(X), nl, writeq(Y), nl, X=Y.
	
	
parse(G, a(X), _In, _Out, _Ast, _) :-
	\+member(a(X) ++> _, G),
	utils:throw_string(["undefined nonterminal:", X]).

parse(_G, X, _In, _Out, _Ast, _) :-
	nonvar(X),
	\+member(X, [a(_), s(_), any_char_except(_), zero_or_more_separated_with(_,_), transformed_by(_,_)]),
	utils:throw_string(["internal error, unknown grammar term:", X]).


all_parses(G, Spec, Input, Parses) :-
	string_codes(Input, Codes),
	findall(Ast, (parse(G, Spec, Codes, [], Ast)/*;Ast=x*/), Parses).

linearize(G, Spec, Ast, Linerization) :-
	catch_with_backtrace(
		linearize2(G, Spec, Ast, Linerization),
		Error,
		print_message(error, Error)).

linearize2(G, Spec, Ast, Linerization) :-
%gtrace,
	parse(G, Spec, Codes, [], Ast),
	(	(ground(Codes), acyclic_term(Codes))
	->	true
	;	(
			term_string(Codes, Msg),
			utils:throw_string(['linearization failed', Msg])
		)
	),
	flatten(Codes, Codes), % filter out non-flat results
	string_codes(Linerization, Codes).

/*

situation:
	grammar and spec is given

scenarios:
	no text entered so far
		nothing under cursor
			feedback:
				current parse is [a-module_body [a-zero_or_more_separated_with []]
				applicable rules:
					module_body ++> zero_or_more_separated_with(top_level_item, newline):
						examples:
							0:
								[a-module_body [a-zero_or_more_separated_with []]
								(nothing)
							1:
								[a-module_body [a-zero_or_more_separated_with [[a-grammar lhs-example rhs-example]]]
							
---------					
	no text entered so far
		nothing under cursor
			does this parse? yes
			what does it parse as?
			what can be entered under cursor?
			








given specifier, var ast, and a closed input:
	






*/





/*		->
			true
		;
		(
			memberchk(a-Actual_Type, Ast)
			throw("child type mismatch*/

/*
autocomplete(_G, Spec, In, _Out, Node, _Gas) :-
	((var(In),var(Node)) -> 
		(
			Node = [a-hint, spec-Spec]
		)
	;
		false
	).
*/

%:- use_module(library(rdet)).
%:- rdet(transform/3).


/*:- table(parse_string/3).
:- table(parse_rhs_list/6).
:- table(items_rest/5).
:- table(separator_and_item/5).	
*/

to_json(X, '???') :-
	var(X),!.

to_json(X, Pairs) :-
	X =.. [l,L],
	maplist(to_json, L, Pairs),!.
	
to_json(X, D) :-
%	writeq(X),
	X =.. [F,L],
	memberchk(F, [n,ch,l,items]),
	maplist(to_json, L, Pairs),
	dict_pairs(D, F, Pairs),!.
	
to_json(X-Y, X2-Y2) :-
	to_json(X, X2),
	to_json(Y, Y2),!.

to_json(X, Y) :-
	number(X),
	term_string(X, X_Str),
	atomic_list_concat(['', X_Str], Y),	
	!.

to_json(X, X).

print_node(N) :-
	%writeq(N),nl,
	to_json(N, D),
	json_write_dict(user_output, D).
