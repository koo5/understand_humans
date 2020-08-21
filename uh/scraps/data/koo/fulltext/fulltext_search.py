import module

class Fulltext(Module):
	def prcess_input(s, input):

	def solr_query(solr_results):
		from urllib.request import urlopen
		from urllib.parse import urlencode
		from urllib.error import URLError, HTTPError, ContentTooShortError
		try:
			connection = urlopen('http://localhost:8983/solr/docs/select?'+urlencode({'q':text,'wt':'python'}))
		except (URLError, HTTPError, ContentTooShortError):
			return
		r1 = connection.read()
		r2 = eval(r1)
		docs = r2['response']['docs']
		solr_results.put(docs)
		