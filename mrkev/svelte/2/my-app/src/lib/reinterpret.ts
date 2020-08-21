function reinterpret_as_hierarchical_notes(text:string)
{
	const notes = [];
	let curernt_indent = 0;
	const lines = text.split('\n');
	lines.forEach((line) =>
	{
		indent(line)

	}

}

/*
get number of tabs at beginning of string
 */
function indents(line:string): number
{
	let result = 0;
	while(true)
	{
		if (line.length == 0)
			break;
		if (line.substr(0,1) == "\t") {
			line = line.substring(1)
			result++;
		}
	}
	return result;
}
