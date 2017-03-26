var NODE = require('./NODE.es6');

function genCode(nodes) {
    var typeNodes = nodes.filter(node=>node.nodeType == NODE.TYPE);

    typeNodes.forEach(node=> {
        console.log(node.ns, node.name);
    })
}

module.exports = genCode;