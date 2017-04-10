var GenJAVA = require('./gen/GenJAVA.es6');

function genCode(nodeList) {
    var gens = [];
    nodeList.findGens().forEach(node=> {
        var gen = new GenJAVA(node, nodeList);
        gen.make();
        gens.push(gen);
    });
}

module.exports = genCode;