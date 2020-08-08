:- module(_, []).

:- use_module(ldl).

/*
	given a spec, find all nonterminals that it depends on
*/

deps([], []):-!. 
deps([H|T], [DH|DT]) :- deps(H, DH), deps(T, DT).
deps(_ ++> Y, D) :- deps(Y, D).
deps(X, X) :- atom(X).
deps(X, []) :- string(X).
deps(zero_or_more_separated_with(X,Y), [X, Y]):-!.
deps(transformed_by(X,_), X):-!.
deps(_:Y, Y):-!.
deps(any_char_except(_), []).


/*
	given a grammar, produce a dict from nonterminal to list of dependencies
*/

deps_dict(G, D) :-
	deps_dict(G, deps{}, D).
	
deps_dict([(K ++> V)|T], D_In, D_Out) :-
	% ensure V is a list
	(
		is_list(V)
	->
		V2 = V
	;
		V2 = [V]
	),
	% look up corresponding value, or create new empty list if not found
	(
		Old_List = D_In.get(K)
	->
		true
	;
		Old_List = []
	),
	append(Old_List, V2, New_List),
	D_Mid = D_In.put(K, New_List),
	deps_dict(T, D_Mid, D_Out).

deps_dict([], D, D).
