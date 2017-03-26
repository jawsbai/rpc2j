var NODE = require('./NODE.es6'),
    odts = require('./odts.es6'),
    TypeRef = require('./TypeRef.es6');

function camelName(name) {
    var ss = name.split('');
    ss[0] = ss[0].toUpperCase();
    return ss.join('');
}

function findNode(nodes, node) {
    return nodes.filter(item=>
        item.ns == node.ns &&
        item.name == node.name &&
        item != node).length > 0;
}
function findType(typeNodes, typeRef, ignoreTypeNode) {
    return typeNodes.filter(item=>
    item.ns == typeRef.ns &&
    item.name == typeRef.name &&
    (!ignoreTypeNode || item != ignoreTypeNode))[0];
}
function findFiled(fields, field) {
    return fields.filter(item=>
        item.name == field.name &&
        item != field).length > 0;
}
function findODT(name) {
    return odts[name.toLowerCase()];
}

function checkTypeRef(typeNodes, typeRef, ignoreTypeNode = null) {
    var odt = findODT(typeRef.name);
    if (odt) {
        typeRef.name = typeRef.name.toLowerCase();
        typeRef.type = odt;
    } else {
        var type = findType(typeNodes, typeRef, ignoreTypeNode);
        if (!type) {
            throw new Error(`type:${typeRef.ns}.${typeRef.name} not found.`);
        }

        typeRef.type = new TypeRef(type);
    }
}
function checkMethod(typeNodes, methodNode) {
    if (methodNode.argTypeRef) {
        checkTypeRef(typeNodes, methodNode.argTypeRef);
    }
    if (methodNode.retTypeRef) {
        checkTypeRef(typeNodes, methodNode.retTypeRef);
    }
}
function checkType(typeNodes, typeNode) {
    typeNode.fields.forEach(field=> {
        if (findFiled(typeNode.fields, field)) {
            throw new Error(`field:${typeNode.name}.${field.name} cannot duplicate definition.`);
        }

        checkTypeRef(typeNodes, field.typeRef, typeNode);
    });
}

function checkNodes(nodes) {
    var notNSNodes = nodes.filter(node=>node.nodeType != NODE.NS);
    var typeNodes = nodes.filter(node=>node.nodeType == NODE.TYPE);
    notNSNodes.forEach(node=> {
        if (findNode(notNSNodes, node)) {
            throw new Error(`${node.nodeType}:${node.name} cannot duplicate definition.`);
        }

        if (node.nodeType == NODE.TYPE) {
            checkType(typeNodes, node);
        } else if (node.nodeType == NODE.METHOD) {
            checkMethod(typeNodes, node);
        }
    });
}

function initTypeRef(ns, typeRef, name, nodes) {
    if (!typeRef.ns) {
        typeRef.ns = ns.name;
    }

    if (!typeRef.createType) {
        return;
    }

    var createType = typeRef.createType;

    typeRef.name = name;
    typeRef.createType = null;

    createType.ns = typeRef.ns;
    createType.name = typeRef.name;

    createType.fields.forEach(field=> {
        if (!field.typeRef.ns) {
            field.typeRef.ns = ns.name;
        }
    });

    nodes.push(createType);
}

function checkAST(nodes) {
    var ns = null;
    nodes.forEach(node=> {
        if (node.nodeType == NODE.NS) {
            ns = node;
        }

        if (node.nodeType == NODE.TYPE || node.nodeType == NODE.METHOD) {
            if (!ns) {
                throw new Error('ns definition is missing.');
            }

            node.ns = ns.name;
        }

        if (node.nodeType == NODE.TYPE) {
            node.fields.forEach(field=> {
                initTypeRef(ns, field.typeRef, `${node.name}_${camelName(field.name)}`, nodes);
            });
        }

        if (node.nodeType == NODE.METHOD) {
            if (node.argTypeRef) {
                initTypeRef(ns, node.argTypeRef, `${node.name}_Arg`, nodes);
            }
            if (node.retTypeRef) {
                initTypeRef(ns, node.retTypeRef, `${node.name}_Ret`, nodes);
            }
        }
    });

    checkNodes(nodes);
}

module.exports = checkAST;