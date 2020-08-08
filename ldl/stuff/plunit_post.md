# pecularities of swipl plunit
variables arent preserved during the macro expansion phase as you would expect?
```
:- begin_tests(x).

test(0, all((X=Y))) :-
	X = 5,
	Y = 6.
	
:- end_tests(x).

% PL-Unit: x . done
% test passed
```

rules with wrong arity are silently ignored:
```
:- begin_tests(x).

test(0, forall(x(X)), all((X=X))) :-
	fail.
	
:- end_tests(x).

% PL-Unit: x  done
% No tests to run
```
