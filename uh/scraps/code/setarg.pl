
g(_).

x(A) :-
	setarg(1, A, wv),
	setarg(1, A, v).
	
y(A) :- A = t(V), nonvar(V), V = v.

:- 
	A = t(_), 
	catch(
		(
			x(A),
			throw(x)
		),
		_,
		writeq(A)
	).