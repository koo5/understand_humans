G = [
	anything_until_space ++> one_or_more(any_char_except(" "))
	listmonitors_line ++> [" ", anything_until_space, " +", name:anything_until_space, 
