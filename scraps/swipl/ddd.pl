:- module(ddd, [ddd/1]).

:- use_module(library(prolog_source)).
:- use_module(library(listing)).
:- use_module(library(record)).
:- use_module(library(apply)).
:- use_module('../lodgeit2/master/lib/utils.pl', [pretty_term_string/2]).

:- use_module(a1, [a1//2]).
:- use_module(a2, [a2/2]).


%:- record clause(term, expanded, variables, layout, comments).


print_clause(X) :-
	write('clause1:'),print_term(X,[]),nl,
	write('clause2:'),pretty_term_string(X,Y),writeln(Y),nl.


ddd(FN) :-
	open(FN, read, In),
	load(In, Parts),
	%maplist(print_clause, Parts),
	nl,nl,
	%maplist(print_part, Parts),
	assertz(world(_{files:[_{path:FN,clauses:Parts}]})),
	ddd2(Parts).

print_part(Part) :-
	write_term(Part.term,[variable_names(Part.variables), quoted(true),spacing(next_argument)]),
	writeln('.').

load(In, Clauses) :-
	prolog_read_source_term(
		In, Term, Expanded,
		[
			variable_names(Vars),
			comments(Comments)
		]
	),
	(
		Term = end_of_file
	->
		Clauses = []
	;
		(
			gensym('c', Guid),
			Clause = clause{ 
				guid:Guid,
				term:Term,
				expanded:Expanded,
				variables:Vars,
				comments:Comments
			},
			Clauses = [Clause|Tail],
			load(In, Tail)
		)
	).

/* pretty-print term with print_term, capture the output into a string*/
/*
pretty_term_string(Term, String) :-
	pretty_term_string(Term, String, []).

pretty_term_string(Term, String, Options) :-
	new_memory_file(X),
	open_memory_file(X, write, S),
	print_term(Term, [output(S), write_options([
		numbervars(true),
		quoted(true),
		portray(true)
		| Options])]),
	close(S),
	memory_file_to_string(X, String).
*/

%do('flip order of ', 




/*
apropos
*/



%ask_user(Question, Options) :-
/*
a0toa1 :-
	ask_user('module name does not match file name', [correct_file_name, correct_module_name]),..
*/



ddd2(C) :-
	phrase(a1(H,B), C),
	a2((H,B),Module),
	%print_term(Module,[]),
	unddd(Module).
	
unddd(Module) :-	
	a2((H,B),Module),
	writeln('unddddddddddddddd'),
	print_term(H,[]),
	print_term(B,[]),

	phrase(a1(H,B), C),
	print_term(C,[]),
	true.
	
	