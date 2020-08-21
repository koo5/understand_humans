import {indents} from './src/lib/reinterpret.ts';
//let {indents} = require('./src/lib/reinterpret.ts');


const test = require('ava');

test('foo', t => {
/*	t.assert(indents("\t\txxx") == 2);
	t.assert(indents("\t\t") == 2);
	t.assert(indents("") == 0);
	t.assert(indents("\txxx\t") == 1);
*/	t.assert(indents("xxx\t") == 0);

	t.pass();
});
