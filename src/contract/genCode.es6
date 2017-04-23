var GenJAVA = require('./gen/GenJAVA.es6'),
    GenJS = require('./gen/GenJS.es6'),
    LANG = require('./LANG.es6');

function genCode(nodeList) {
    nodeList.findGens().forEach(node=> {
        var gen;
        if (node.lang == LANG.JAVA) {
            gen = new GenJAVA(node, nodeList);
        } else {
            gen = new GenJS(node, nodeList);
        }
        gen.make();
    });
}

module.exports = genCode;