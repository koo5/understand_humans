import * as r from './src/lib/reinterpret.ts';
import * as ldo from './src/lib/ldo.ts';
//let {indents} = require('./src/lib/reinterpret.ts');


const test = require('ava');

test('foo', t => {
	t.assert(r.indents("\t\txxx") == 2);
	t.assert(r.indents("\t\t") == 2);
	t.assert(r.indents("") == 0);
	t.assert(r.indents("\txxx\t") == 1);
	t.assert(r.indents("xxx\t") == 0);
	t.pass();
});

test('Ldo serializes', async function(t){
	ldo.ldo_test();
	t.pass();
});

test('Ldo serializes2', async function(t){
	let o = r.new_document()
	let quads = await o.save([]);
	t.deepEqual(quads, []);
	t.pass();
});

