var NODE = require('./NODE.es6');

class NodeList {
    constructor(nodes) {
        this._nodes = nodes;
    }

    get nodes() {
        return this._nodes;
    }

    findTypeByRef(typeRef, ignoreTypeNode) {
        return this.findTypes().filter(node=> node.ns == typeRef.ns && node.name == typeRef.name && (!ignoreTypeNode || node != ignoreTypeNode))[0];
    }

    findNamedNodes() {
        return this._nodes.filter(node=>node.nodeType == NODE.TYPE || node.nodeType == NODE.METHOD);
    }

    _findNodes(nodeType) {
        return this._nodes.filter(node=>node.nodeType == nodeType);
    }

    findGens() {
        return this._findNodes(NODE.GEN);
    }

    findTypes() {
        return this._findNodes(NODE.TYPE);
    }

    findMethods() {
        return this._findNodes(NODE.METHOD);
    }
}

module.exports = NodeList;