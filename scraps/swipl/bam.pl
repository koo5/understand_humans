
/*
my_pred(
trading4, static(Data), recurse(Pairs), tread(Results)) :-
	% pull required data from Data
	dict_vars(Data, [Start_Date, End_Date, Entity_Identifier, Context_Id_Base]),
	% do stuff with Data
	Context_Template = context(_, (Start_Date, End_Date), entity(Entity_Identifier, _)),
	% do stuff with head of the recursed-on list
	(Sub_Account, Unit_Accounts) = Pair,
	Context_Info = context_arg0(Context_Id_Base, Context_Template, duration, Sub_Account, 'basic:Dimension_Investments', 'basic:Investment'),
	print_detail_accounts(Static_Data, Context_Info, Unit_Accounts, Results_In, Results_Mid),
	recurse.
	
static(Data):   expands into Data
recurse(Pairs): expands into [Pair|Pairs]
tread(Results): expands into Results_In, Results_Out...
recurse expands into: recurse(Data, Pairs, Results_Mid)
and finally:
trading4(_,[],Results,Results).
*/



/*
my_preds(dimensions_output, [static(Data), tread(Results)],
(

trading4(
	recurse(Pairs), 
	use_static([Start_Date, End_Date, Entity_Identifier, Context_Id_Base])
) :-
	
	% 4 ugly lines that actually do something
	Context_Template = context(_, (Start_Date, End_Date), entity(Entity_Identifier, _)),
	(Sub_Account, Unit_Accounts) = Pair,
	Context_Info = context_arg0(Context_Id_Base, Context_Template, duration, Sub_Account, 'basic:Dimension_Investments', 'basic:Investment'),
	print_detail_accounts(Context_Info, Unit_Accounts),
	
	recurse.
*/


/*
my_preds(dimensions_output, [static(Data), tread(Results)],
(

trading4(
	recurse(Pairs), 
	use_static([Start_Date, End_Date, Entity_Identifier, Context_Id_Base])
) :-
	% 4 ugly lines that actually do something, cleaned up. I could have cleaned them up right at the start, but 1) who has the brain-power, when the boilerplate takes most of it, 2) writing it like this, we're gonna rely on an ide to tell what argument is what.
	
	detail_accounts_lines(
		context_arg0(
			Context_Id_Base, 
			context(_, (Start_Date, End_Date), entity(Entity_Identifier, _)),
			duration, 
			pair.sub_account, 
			'basic:Dimension_Investments', 
			'basic:Investment'),
		Pair.unit_accounts)
	).
*/


/*
my_preds(dimensions_output, [static(Data), tread(Results)],
(

trading4(recurse(Pairs)) :-
	detail_accounts_lines(
		context_arg0(
			Context_Id_Base, 
			context(_, (Start_Date, End_Date), entity(Entity_Identifier, _)),
			duration, 
			pair.sub_account, 
			'basic:Dimension_Investments', 
			'basic:Investment'),
		Pair.unit_accounts)
	).
*/




/*
abstract away this argument. % the 'basic:Dimension_Investments'
it is dimension_id of dimension.
add dimension to static_data.
....
....
*/
