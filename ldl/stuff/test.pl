:- begin_tests(x).

test(0, forall(x(X)), all((X=X))) :-
	fail.
	
:- end_tests(x).

