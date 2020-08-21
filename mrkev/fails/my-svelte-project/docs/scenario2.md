this scenario describes desired workflow with a hierarchically structured text.

### step 1

* prefixes
```
``` 
* document
```
```
* manually-added triples
```
```
* triples generated from structure
```
```

### step 2
i paste some text

* prefixes
```
``` 
* document
```
mind-mapping sw potentially usable with rdf:
	meta:
		http://www.opensourcecreative.org/ep040/

	ordered from most promising to least:
		iMapping
			recommended
			https://www.youtube.com/watch?v=KKh6XY2DHS8
				"formality considered harmful"
			setevi-html
			http://xam.de/go/pkm/

		freeplane
			recommended
			seems to have a more freeform attitude, yet still keyboard friendly.
			i can definitely imagine this used for exploring rdf-based data (or a high-level, possibly domain-specific export of them)
			scriptable
			MapInsight
				https://freeplane.sourceforge.io/wiki/index.php/Add-ons_(install)
				https://github.com/adxsoft/MapInsight-Addon
			https://freeplane.sourceforge.io/wiki/index.php/Current_Freeplane_File_Format
			http://freemind.sourceforge.net/wiki/index.php/Import_and_export
```
* manually-added triples
```
```
* triples generated from structure
```
```

### step 3
i somehow trigger automatic creation of triples that fully represent the document - as a hierarchy of notes. Each nonempty line is one note.

* prefixes
```
``` 
* document
```
mind-mapping sw potentially usable with rdf:
	meta:
		http://www.opensourcecreative.org/ep040/

	ordered from most promising to least:
		iMapping
			recommended
			https://www.youtube.com/watch?v=KKh6XY2DHS8
				"formality considered harmful"
			setevi-html
			http://xam.de/go/pkm/

		freeplane
			recommended
			seems to have a more freeform attitude, yet still keyboard friendly.
			i can definitely imagine this used for exploring rdf-based data (or a high-level, possibly domain-specific export of them)
			scriptable
			MapInsight
				https://freeplane.sourceforge.io/wiki/index.php/Add-ons_(install)
				https://github.com/adxsoft/MapInsight-Addon
			https://freeplane.sourceforge.io/wiki/index.php/Current_Freeplane_File_Format
			http://freemind.sourceforge.net/wiki/index.php/Import_and_export
```
* manually-added triples
```
```
* triples generated from structure
```
<:note1> <mrkev:value> "mind-mapping sw potentially usable with rdf".
<:note1> <mrkev:children> (<:note2> <:note4>).
<:note2> <mrkev:value> "meta".
etc...
```


### step 4
i annotate some of these notes

* prefixes
```
``` 
* document
```
mind-mapping sw potentially usable with rdf:
	meta:
		http://www.opensourcecreative.org/ep040/

	ordered from most promising to least:
		iMapping
			recommended
			https://www.youtube.com/watch?v=KKh6XY2DHS8
				"formality considered harmful"
			setevi-html
			http://xam.de/go/pkm/

		freeplane
			recommended
			seems to have a more freeform attitude, yet still keyboard friendly.
			i can definitely imagine this used for exploring rdf-based data (or a high-level, possibly domain-specific export of them)
			scriptable
			MapInsight
				https://freeplane.sourceforge.io/wiki/index.php/Add-ons_(install)
				https://github.com/adxsoft/MapInsight-Addon
			https://freeplane.sourceforge.io/wiki/index.php/Current_Freeplane_File_Format
			http://freemind.sourceforge.net/wiki/index.php/Import_and_export
```
* manually-added triples
```
<:note5> <mrkev:about> <:sw1>.
<:sw1> <swo:homepage> "https://www.imapping.info/".
```
* triples generated from structure
```
<:note1> <mrkev:value> "mind-mapping sw potentially usable with rdf".
<:note1> <mrkev:children> (<:note2> <:note4>).
<:note2> <mrkev:value> "meta".
etc...
```
