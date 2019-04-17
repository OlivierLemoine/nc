const fs = require('fs');
const parse = require('./parser.js').parse;
const split = require('./splitter.js').split;

let file = fs.readFileSync('test.nc').toString();

console.clear();
// parse(file);
let res = split(file);
console.log(res);

res = parse(res);
console.log(res);
