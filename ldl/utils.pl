:- module(_, []).

throw_string(List_Or_Atom) :-
	flatten([List_Or_Atom], List),
	writeq(List),
	atomic_list_concat(List, String),
	throw(string(String)).

print_stuff(X) :-
	print_term(X,[quoted(true)]), nl.

list_of_pairs_with_duplicate_keys_to_dict(L, D) :-
	list_of_pairs_with_duplicate_keys_to_dict(L, _{}, D).
	
list_of_pairs_with_duplicate_keys_to_dict([(K:V)|T], D_In, D_Out) :-
	(
		V2 = D_In.get(K)
	->
		true
	;
		V2 = []
	),
	append(V2, V, V3),
	D_Mid = D_In.put(K, V3),
	list_of_pairs_with_duplicate_keys_to_dict(T, D_Mid, D_Out).

list_of_pairs_with_duplicate_keys_to_dict([], D, D).

:- table(close_lists_recursively/1).

close_lists_recursively(X) :-
	(
		nonvar(X)
	->
		(
			append(X, [], X)
		->
			maplist(close_lists_recursively, X)
		;
			(
				compound(X)
			->
				(
					X =.. [_|Args],
					maplist(close_lists_recursively, Args)
				)
			;
				true
			)
		)
	;
		true
	).
	
	
