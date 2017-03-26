var readFile = require('./readFile.es6'),
    Parser = require('./Parser.es6');

var tokens = readFile('../../test/index.d');
console.log(tokens);
console.log('-----------');
var parser = new Parser(tokens);
var ast = parser.parse();

// console.log(JSON.stringify(ast, null, 1));
