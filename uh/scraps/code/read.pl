x :- 
	open('uh.pl', read, S), 
	do_read(S).
	
do_read(S) :-
	(
		read(S, T)
	->
		(
			writeln(T)
			,do_read(S)
		)
	;
		writeln(end)
	).
		
:- x.
