#!/usr/bin/env python3

'''
1) read in a uh_markup1 xml file
2) produce extracted rdf statements
3) produce a rdf fully encoding the document, so that it's possible to serialize it as plain text, as it was before adding the markup manually
'''
from lxml import etree
from io import StringIO, BytesIO

import click


@click.command()
@click.argument('input', type=click.File('rb'), required=True)
def main(input):
	
	x = etree.parse(input).getroot()
	process(x)
	
def process(x, prefixes):
	prefixes = prefixes[:]
	for y in x:
		if y.tag == '{https://rdf.lodgeit.net.au/uh1/doc1}uh1_prefix':
			prefixes.append(
	 
	 {https://rdf.lodgeit.net.au/uh1/doc1}uh1_prefix
	
	__import__('IPython').embed()



if __name__ == '__main__':
    main()
