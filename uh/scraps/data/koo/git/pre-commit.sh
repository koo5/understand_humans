#!/usr/bin/env bash

: '

{
  "@type": "https://koo5.github.io/rdf/v1/uh/declaration",
  "https://koo5.github.io/rdf/v1/uh/location": "https://koo5.github.io/rdf/v1/uh/containing_file",
  "https://koo5.github.io/rdf/v1/uh/description": "git hook that greps whole repo for a string",
  "https://koo5.github.io/rdf/v1/uh/description": "grep repo files"
  "https://koo5.github.io/rdf/v1/uh/note": "copy this into .git/hooks/"
}

'

#echo "=-=-="

git grep finishme

echo "=-=-="
