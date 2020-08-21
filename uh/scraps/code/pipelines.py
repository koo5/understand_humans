

funs = {}
def fun(a0, a1):
	if isinstance(a0, str):
		funs[a0] = a1
	else:
		a1['python_function_object'] = a0
		funs[a1['name']] = a1

def run(x, input):
	print('calling ', x)
	if isinstance(x, str):
		f = funs[x]
		if isinstance(f, dict):
			return f['python_function_object'](input)
		else:
			return run(f, input)
	elif isinstance(x, list):
		if x == []:
			return input
		return run(x[1:], run(x[0], input))
	else:
		raise NotImplementedError(x)

