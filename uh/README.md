# understand_humans
## what
Universal shell. Essentially the same idea is KRunner, gnome-do, https://wiki.gnome.org/Projects/synapse, and many others. 
I focus on the UI (mainly a command-line ui) and on the integration of controlled systems/data sources here. 
Intended to be simple enough to implement by one person, installable with one command, and useful out of the box. 
Simple core, extensible architecture. A command line client and a service exposing, over configured data sources: 
fulltext search, search in structured data, and other services. Iniitally focusing on notes, bookmarks, controlling your computer and discovering new software and data sources.


## related/similar projects
https://frdcsa.org/frdcsa/internal/architect https://frdcsa.org/frdcsa/minor/system-recommender https://frdcsa.org/frdcsa/minor/cfo https://github.com/aindilis/cfo/blob/master/example.pl https://frdcsa.org/frdcsa/internal/frdcsal
```
05.05.20 20:40:22<aindilis> system-recommender allows you to search using information retrieval techniques
05.05.20 20:40:33<aindilis> all the software systems CSO knows about
05.05.20 20:41:00<aindilis> cfo tracks all the functions and what is known about them
05.05.20 20:41:16<aindilis> and frdcsal is basically a way to translate language to code using a translation memory
```
https://github.com/jbalint/banshee-sympatico

https://wiki.gnome.org/Projects/Tracker

https://www.omgubuntu.co.uk/2010/11/synapse-gnome-do-launcher-app-review-ubuntu
	* synapse is still alive
	* check out the plugins directory
	* not sure if it searches tracker too
	
https://kupferlauncher.github.io/


## omniterm/ldl/cnl/nl interface

The user interface can take a couple of forms. 


### text input box
...