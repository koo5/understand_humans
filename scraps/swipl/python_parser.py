import ast
import astor

	


def smell(x) :
	print(x)





def cmd_turn_print_into_format(text):
	""" 
		turn a call to print into a call to format 
	"""

	args = cmd_get_print_arguments(text)
	
	rfs = '' # resultant format string 
	fal = [] # format argument list
	
	for i in args:
		print(type(i))
		if isinstance(i, ast.Str):
			rfs = rfs + i.s
		else:
			rfs = rfs + '{}'
			fal.append(astor.to_source(i).strip())
	return '"""' + rfs + '"""' + '.format(' + ', '.join(fal) + ')'
	
		
	


def cmd_get_print_arguments(text):

	"""
	pipeline('get print arguments',
		[parse(text), 
	"""

	p = parse(text)
	p2 = p.body[0].value
	return get_print_arguments(p2)
	











def get_print_arguments(parse_tree):
	v = parse_tree
	if v.func.id != 'print':
		smell('this doesnt look like a print statement')
	return v.args
	










def parse(text):
	return ast.parse(text)

















def test_0():
	print(cmd_get_print_arguments("""print('diag:', d, '" area[m]:', rr[Am], 'W:', Wcm, 'cm H:', Hcm, 'cm')"""))
	
def test_1():
	print(cmd_turn_print_into_format("""print('diag:', d, '" area[m]:', rr[Am], 'W:', Wcm, 'cm H:', Hcm, 'cm')"""))


