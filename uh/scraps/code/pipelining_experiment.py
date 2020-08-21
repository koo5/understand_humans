from pipelines import *

import ast
import astor


def _(files):
	raise NotImplementedError()
fun(_, {
	'name': 'expand_fun_names',
	'desc': 'change fun names from underscores into full names',
	'intro': 'legacy ide support'
})

def _(args):
	rfs = '' # resultant format string 
	fal = [] # format argument list
	
	for i in args:
		#print(type(i))
		if isinstance(i, ast.Str):
			rfs = rfs + i.s
		else:
			rfs = rfs + '{}'
			fal.append(astor.to_source(i).strip())
	return '"""print(' + rfs + '"""' + '.format(' + ', '.join(fal) + '))'
fun(_,{
	'name': 'turn_print_arguments_into_format',
	'desc': 'turn print arguments into a call to format',	
	'input': {'type':str, 'desc': 'text of a print statement, typically with multiple arguments'}, 
	'output': {'type':str, 'desc': 'text of a print statement with format()'}})
		
def _(parse_tree):
	v = parse_tree.body[0].value
	if v.func.id != 'print':
		smell('this doesnt look like a print statement')
	return v.args
fun(_,{
	'name': 'get_print_arguments'})

def _(text):
	return ast.parse(text)
fun(_,{
	'name': 'parse'})


"""

so, one thing to note is that addressing functions by their input and output types doesn't seem so convenient,
at least in this little example


"""


fun('turn_print_into_print_with_format', ['parse', 'get_print_arguments', 'turn_print_arguments_into_format'])


def test_0():
	print(run(
		'turn_print_into_print_with_format',
		"""print('diag:', d, '" area[m]:', rr[Am], 'W:', Wcm, 'cm H:', Hcm, 'cm')"""))
	



def smell(x) :
	print(x)



