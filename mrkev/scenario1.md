This file outlines one way how mrkev might be used. I have some document that starts like this:

```
# Accounts Assessor

This repository hosts a program that derives, validates, and corrects the financial information that it is given. The program uses redundancy to carry out its validations and corrections. By this it is meant that knowledge of parts of a company's financial data imposes certain constraints on the company's other financial data. If the program is given a company's ledger, then it knows what the balance sheet should look like. If the program is given a company's balance sheet, then it has a rough idea of what the ledger should look like.

The functionality of the program (needs updating):
* Given a bank statement, it can derive balance sheets, trial balances, investment report
* Given a hire purchase arrangement, it can track the balance of a hire purchase account through time
* Given a hire purchase arrangement, it can derive the total payment and the total interest
* Given a hire purchase arrangement and ledger, it can guess what the erroneous transactions are
* Given a hire purchase arrangement and ledger, it can generate correction transactions to fix the erroneous transactions
json-based endpoints:
* It can determine tax residency by carrying out a dialog with the user
* It can determine small business entity status by carrying out a dialog with the user
```

i want to produce some linked data based on the document, and at the same time preserve the document as is, because the unformalized formatting itself carries most of the information, and i want to edit it and render it enriched with that data. Gradual semanticizing. Such description could mean anything, so an example of the imagined workflow follows.

step 1 is to copy the document over to the editor. The editor window has at least these frames:
* prefixes 
* document
* manually-added triples
* triples generated from structure

### step 1
empty editor window:

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
pasting the text into the document frame:

* prefixes
```
``` 
* document
```
# Accounts Assessor

This repository hosts a program that derives, validates, and corrects the financial information that it is given. The program uses redundancy to carry out its validations and corrections. By this it is meant that knowledge of parts of a company's financial data imposes certain constraints on the company's other financial data. If the program is given a company's ledger, then it knows what the balance sheet should look like. If the program is given a company's balance sheet, then it has a rough idea of what the ledger should look like.

The functionality of the program (needs updating):
* Given a bank statement, it can derive balance sheets, trial balances, investment report
* Given a hire purchase arrangement, it can track the balance of a hire purchase account through time
* Given a hire purchase arrangement, it can derive the total payment and the total interest
* Given a hire purchase arrangement and ledger, it can guess what the erroneous transactions are
* Given a hire purchase arrangement and ledger, it can generate correction transactions to fix the erroneous transactions
json-based endpoints:
* It can determine tax residency by carrying out a dialog with the user
* It can determine small business entity status by carrying out a dialog with the user
```
* manually-added triples
```
```
* triples generated from structure
```
```

note that the original document is markdown-formatted. In this case, i choose to preserve that formatting. A plaintext rendering of the document should stay valid markdown.

### step 3
i might set up some prefixes.

* prefixes
```
@prefix products: <https://rdf.lodgeit.net.au/kb/products#> .
@prefix codebases: <https://rdf.lodgeit.net.au/kb/codebases#> .

``` 
* document
```
# Accounts Assessor

This repository hosts a program that derives, validates, and corrects the financial information that it is given. The program uses redundancy to carry out its validations and corrections. By this it is meant that knowledge of parts of a company's financial data imposes certain constraints on the company's other financial data. If the program is given a company's ledger, then it knows what the balance sheet should look like. If the program is given a company's balance sheet, then it has a rough idea of what the ledger should look like.

The functionality of the program (needs updating):
* Given a bank statement, it can derive balance sheets, trial balances, investment report
* Given a hire purchase arrangement, it can track the balance of a hire purchase account through time
* Given a hire purchase arrangement, it can derive the total payment and the total interest
* Given a hire purchase arrangement and ledger, it can guess what the erroneous transactions are
* Given a hire purchase arrangement and ledger, it can generate correction transactions to fix the erroneous transactions
json-based endpoints:
* It can determine tax residency by carrying out a dialog with the user
* It can determine small business entity status by carrying out a dialog with the user
```
* manually-added triples
```
```
* triples generated from structure
```
```

### step 4
i select `Accounts Assessor`, and i perhaps drag it into the `object` position of a "new triple" area at the top of "manually-added triples" frame. I fill in `predicate`: <rdfs:label>, i fill in `subject`: <products:accounts_assessor>. I click `add`, and the triple appears in the list of manually-added triples. Somewhat under the hood, the "Accounts Assessor" bit of the document is now marked up with the information that it should stay in sync with the object of the triple.  

* prefixes
```
@prefix products: <https://rdf.lodgeit.net.au/kb/products#> .
@prefix codebases: <https://rdf.lodgeit.net.au/kb/codebases#> .

``` 
* document
```
# Accounts Assessor

This repository hosts a program that derives, validates, and corrects the financial information that it is given. The program uses redundancy to carry out its validations and corrections. By this it is meant that knowledge of parts of a company's financial data imposes certain constraints on the company's other financial data. If the program is given a company's ledger, then it knows what the balance sheet should look like. If the program is given a company's balance sheet, then it has a rough idea of what the ledger should look like.

The functionality of the program (needs updating):
* Given a bank statement, it can derive balance sheets, trial balances, investment report
* Given a hire purchase arrangement, it can track the balance of a hire purchase account through time
* Given a hire purchase arrangement, it can derive the total payment and the total interest
* Given a hire purchase arrangement and ledger, it can guess what the erroneous transactions are
* Given a hire purchase arrangement and ledger, it can generate correction transactions to fix the erroneous transactions
json-based endpoints:
* It can determine tax residency by carrying out a dialog with the user
* It can determine small business entity status by carrying out a dialog with the user
```
* manually-added triples
```
<products:accounts_assessor> <rdfs:label> "Accounts Assessor". 
```
* triples generated from structure
```
```

### step 5

next i may add two triples not anchored to the document in any way:

* prefixes
```
@prefix products: <https://rdf.lodgeit.net.au/kb/products#> .
@prefix codebases: <https://rdf.lodgeit.net.au/kb/codebases#> .

``` 
* document
```
# Accounts Assessor

This repository hosts a program that derives, validates, and corrects the financial information that it is given. The program uses redundancy to carry out its validations and corrections. By this it is meant that knowledge of parts of a company's financial data imposes certain constraints on the company's other financial data. If the program is given a company's ledger, then it knows what the balance sheet should look like. If the program is given a company's balance sheet, then it has a rough idea of what the ledger should look like.

The functionality of the program (needs updating):
* Given a bank statement, it can derive balance sheets, trial balances, investment report
* Given a hire purchase arrangement, it can track the balance of a hire purchase account through time
* Given a hire purchase arrangement, it can derive the total payment and the total interest
* Given a hire purchase arrangement and ledger, it can guess what the erroneous transactions are
* Given a hire purchase arrangement and ledger, it can generate correction transactions to fix the erroneous transactions
json-based endpoints:
* It can determine tax residency by carrying out a dialog with the user
* It can determine small business entity status by carrying out a dialog with the user
```
* manually-added triples
```
<products:accounts_assessor> <rdfs:label> "Accounts Assessor".
<products:robust has_codebase <codebases:labs_accounts_assessor>.
<products:robust has_codebase <codebases:LodgeITSmart>.
 
```
* triples generated from structure
```
```

### step 6

next, i may specify that "This repository" refers to <codebases:labs_accounts_assessor>. I would select "This repository" and somehow treat it as a standalone object - a block of text. This block would automatically have an uri, and i might create a triple referencing that uri. 

* prefixes
```
@prefix products: <https://rdf.lodgeit.net.au/kb/products#> .
@prefix codebases: <https://rdf.lodgeit.net.au/kb/codebases#> .

``` 
* document
```
# Accounts Assessor

This repository hosts a program that derives, validates, and corrects the financial information that it is given. The program uses redundancy to carry out its validations and corrections. By this it is meant that knowledge of parts of a company's financial data imposes certain constraints on the company's other financial data. If the program is given a company's ledger, then it knows what the balance sheet should look like. If the program is given a company's balance sheet, then it has a rough idea of what the ledger should look like.

The functionality of the program (needs updating):
* Given a bank statement, it can derive balance sheets, trial balances, investment report
* Given a hire purchase arrangement, it can track the balance of a hire purchase account through time
* Given a hire purchase arrangement, it can derive the total payment and the total interest
* Given a hire purchase arrangement and ledger, it can guess what the erroneous transactions are
* Given a hire purchase arrangement and ledger, it can generate correction transactions to fix the erroneous transactions
json-based endpoints:
* It can determine tax residency by carrying out a dialog with the user
* It can determine small business entity status by carrying out a dialog with the user
```
* manually-added triples
```
<products:accounts_assessor> <rdfs:label> "Accounts Assessor".
<products:robust has_codebase <codebases:labs_accounts_assessor>.
<products:robust has_codebase <codebases:LodgeITSmart>.
<:block1> <mrkev:refers_to> <codebases:labs_accounts_assessor>.
 
```
* triples generated from structure
```
```
 

### step 7
next i could mint a predicate <kb:has_functionality>, and create a triple for each of the bullet points.  

* prefixes
```
@prefix products: <https://rdf.lodgeit.net.au/kb/products#> .
@prefix codebases: <https://rdf.lodgeit.net.au/kb/codebases#> .

``` 
* document
```
# Accounts Assessor

This repository hosts a program that derives, validates, and corrects the financial information that it is given. The program uses redundancy to carry out its validations and corrections. By this it is meant that knowledge of parts of a company's financial data imposes certain constraints on the company's other financial data. If the program is given a company's ledger, then it knows what the balance sheet should look like. If the program is given a company's balance sheet, then it has a rough idea of what the ledger should look like.

The functionality of the program (needs updating):
* Given a bank statement, it can derive balance sheets, trial balances, investment report
* Given a hire purchase arrangement, it can track the balance of a hire purchase account through time
* Given a hire purchase arrangement, it can derive the total payment and the total interest
* Given a hire purchase arrangement and ledger, it can guess what the erroneous transactions are
* Given a hire purchase arrangement and ledger, it can generate correction transactions to fix the erroneous transactions
json-based endpoints:
* It can determine tax residency by carrying out a dialog with the user
* It can determine small business entity status by carrying out a dialog with the user
```
* manually-added triples
```
<products:accounts_assessor> <rdfs:label> "Accounts Assessor".
<products:robust has_codebase <codebases:labs_accounts_assessor>.
<products:robust has_codebase <codebases:LodgeITSmart>.
<:block1> <mrkev:refers_to> <codebases:labs_accounts_assessor>.
<codebases:labs_accounts_assessor> <kb:has_functionality> "Given a bank statement, it can derive balance sheets, trial balances, investment report".
etc.  
 
```
* triples generated from structure
```
```
 
