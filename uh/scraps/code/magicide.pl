
/*a module*/

:- use_module(library(record)).

:- record codebase(id, lang, modules).

:- dynamic user:mem/2.

:- assertz(mem(0, codebase('x', magiclog, []))).

uh(Cmd) :-
	mem(Mem_Id, Codebase),
	codebase_do(Cmd, Codebase, Codebase2),
	retractall(mem(Mem_Id, Codebase)),
	asserta(mem(Mem_Id, Codebase2)).

codebase_do('add module', In, Out) :-
	codebase_modules(In, Modules),
	codebase_modules(Out, Modules2),
	append(Modules, [New_Module], Modules2),
	New_Module = module(_Name, _Location, _Body).

