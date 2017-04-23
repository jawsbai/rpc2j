var readFile = require('./readFile.es6'),
    AST = require('./AST.es6'),
    genCode = require('./genCode.es6');

var tokens = readFile('../../test/index.d');
console.log('tokens', tokens);
console.log('-----------');
var ast = new AST(tokens);
var nodeList = ast.parse();

console.log(nodeList);

// console.log(JSON.stringify(nodes, null, 4));

genCode(nodeList);