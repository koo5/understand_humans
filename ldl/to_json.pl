to_json(n(L), D) :-
	maplist(to_json(L, Pairs),
	dict_pairs(D, n, Pairs).

to_json(ch(L), D) :-
	dict_pairs(D, ch, L).

to_json(X-Y, Y-Z) :-
	to_json(Y, Z).
