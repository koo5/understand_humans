:- use_module(library(clpq)).

solve :-
	{Req_calories_kcal = 2000.0},
	{Req_calories_kcal >= 1800.0, Req_calories_kcal =< 2200.0},
	{Ingredients_0_calories_kcal = 347 * Ingredients_0_kg},
	{Ingredients_1_calories_kcal = 123 * Ingredients_1_kg},
	{Meal_calories_kcal = Ingredients_0_calories_kcal + Ingredients_1_calories_kcal},
	writeq(('Ingredients_0_kg:', Ingredients_0_kg)),nl,
	writeq(('Ingredients_1_kg:', Ingredients_1_kg)),nl,
	writeq(('Meal_calories_kcal:', Meal_calories_kcal)),nl,
	print_term(Meal_calories_kcal, [])
	.
	
	



