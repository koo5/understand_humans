:- debug.

:- use_module(library(semweb/rdf11)).
:- use_module(library(semweb/turtle)).
:- use_module(library(semweb/rdf_ntriples)).
%:- use_module(library(semweb/rdf_db)).

?- rdf_register_prefix(ldl, 'http://ldl.ldl#').
?- rdf_register_prefix(f, 'file://').
:- rdf_load("ldl_bootstrap.ttl", []).
grammar('file://#bn0').

print_each_triple :-
	rdf(S,P,O), print(S), write(' '), print(P), write(' '), print(O), write('\n').

:- findall(_, print_each_triple, _).


wat2 :- rdf_member(M, 'file://#bn0'), print(M), write('\n').
% :- findall(_, wat2, _).



literal([H|IR], AfterLiteral, [H|LR]) :-
	literal(IR, AfterLiteral, LR).
literal(I, I, []).




:- literal(`->b`, _R, `->`).

% yield triples given string
rdfs(Subject, Predicate, String) :-
	rdf(Subject, Predicate, String ^^ 'http://www.w3.org/2001/XMLSchema#string').

% yield triples given atom, or yield atom
rdfa(Subject, Predicate, Atom) :-
	atom_string(Atom, String),
	rdfs(Subject, Predicate, String).

rdfa(Subject, Predicate, Atom) :-
	rdfs(Subject, Predicate, String).
	atom_string(Atom, String),

rdf_new(NewNode, X) :-
	rdf_create_bnode(NewNode),
	rdf_new2(X, NewNode).

rdf_new2([], _).

rdf_new2([Pred]|Rest], NewNode) :-
	rdf_new2(Rest, NewNode).
	
rdf_new2([Pred,Obj|Objs]|Rest], NewNode) :-
	rdf_assert(NewNode, Pred, Obj),
	rdf_new2([Pred,Objs]|Rest).

parse(Input, LhsName, Ast) :-
	string(LhsName),
	
	% Grammar is hardcoded for now.
	grammar(Grammar),
	
	% for each node in Grammar
	rdf_member(Rule, Grammar),

	% if it is "grammar"
	rdf(Rule, ldl:type, "grammar"), 

	ldl_child_contents_by_name(Rule, "node_name", LhsName),
	ldl_child_by_name(Rule, "grammar", Rhs),
	
	parse(Input, LhsName, Rhs, Ast), 
	%write('NN:\n'),	print_term(NN,[]),
	true.

parse(Input, LhsName, [], Ast) :-
	rdf_new(Ast, [rdf:type, ldl:compound],[ldl:type, LhsName],[ldl:children, rdf:nil]]).

parse(Input, LhsName, [RhsHead], Ast) :-
	parse_rhs_item(Input, RhsHead, Ast)




parse(Input, [Item|Items], Ast) :-
	% Grammar is hardcoded for now.
	grammar(Grammar),
	
	% for each node in Grammar
	rdf_member(Rule, Grammar),

	% if it is "grammar"
	rdf(Rule, ldl:type, "grammar"), 

	ldl_child_contents_by_name(Rule, "node_name", Lhs),
	ldl_child_by_name(Rule, "grammar", Rhs),
	
	parse(Input, Rhs, 
	
	%write('NN:\n'),	print_term(NN,[]),
	
	true.

ldl_child_contents_by_name(Rule, NameString, ChildContents)
	ldl_child_by_name(Rule, "node_name", Value),
	rdfs(Value, ldl:contents, ChildContents).


ldl_child_by_name(Rule, NameString, Child) :- 
	rdf(Rule, ldl:children, Children),
	rdf_member(KV, Children),
	rdfs(KV, f:key, NameString),
	rdf(KV, f:value, Child).

	
:- write('\n').
:- write('\n').

:- findall(_, parse(`\n`, "newline", Ast), Parses), print_term(Parses,[]).
%:- findall(_, parse(`a ++> b.`, "statement", AST), Parses), print_term(Parses,[]).




	%rdf_create_bnode(Bnode),
	%rdf_assert(Bnode, rdf:type, ldl:compound),
	%rdf_assert(Bnode, ldl:type, LhsName),
	%rdf_assert(Bnode, ldl:children, rdf:nil).	
