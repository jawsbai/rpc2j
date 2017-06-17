var readFile = require('./contract/readFile.es6'),
    AST = require('./contract/AST.es6'),
    genCode = require('./contract/genCode.es6');


module.exports = function (file) {
    var tokens = readFile(file);
    // console.log('tokens', tokens);
    // console.log('-----------');
    var ast = new AST(tokens);
    var nodeList = ast.parse();

    // console.log(nodeList);

    // console.log(JSON.stringify(nodeList, null, 4));

    genCode(nodeList);
};