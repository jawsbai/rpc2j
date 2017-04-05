var NODE = require('./NODE.es6'),
    odts = require('./odts.es6'),
    TypeRef = require('./TypeRef.es6'),
    NodeList = require('./NodeList.es6');

function camelName(name) {
    var ss = name.split('');
    ss[0] = ss[0].toUpperCase();
    return ss.join('');
}

function findODT(name) {
    return odts[name.toLowerCase()];
}
function checkTypeRef(nodeList, typeRef, ignoreTypeNode = null) {
    var odt = findODT(typeRef.name);
    if (odt) {
        typeRef.name = typeRef.name.toLowerCase();
        typeRef.type = new TypeRef(odt);
    } else {
        var type = nodeList.findTypeByRef(typeRef, ignoreTypeNode);
        if (!type) {
            throw new Error(`type:${typeRef.ns}.${typeRef.name} not found.`);
        }

        typeRef.type = new TypeRef(type);
    }
}

function checkMethod(nodeList, methodNode) {
    if (methodNode.argTypeRef) {
        checkTypeRef(nodeList, methodNode.argTypeRef);
    }
    if (methodNode.retTypeRef) {
        checkTypeRef(nodeList, methodNode.retTypeRef);
    }
}
function checkMethods(nodeList) {
    nodeList.findMethods().forEach(node=>checkMethod(nodeList, node));
}

function findFiled(fields, field) {
    return fields.filter(item=> item.name == field.name && item != field).length > 0;
}
function checkType(nodeList, typeNode) {
    typeNode.fields.forEach(field=> {
        if (findFiled(typeNode.fields, field)) {
            throw new Error(`field:${typeNode.name}.${field.name} cannot duplicate definition.`);
        }

        checkTypeRef(nodeList, field.typeRef, typeNode);
    });
}
function checkTypes(nodeList) {
    nodeList.findTypes().forEach(node=>checkType(nodeList, node));
}

function checkNamedNodes(nodeList) {
    var dic = {};
    nodeList.findNamedNodes().forEach(node=> {
        var key = `${node.ns}${node.name}`;
        if (dic[key]) {
            throw new Error(`${node.nodeType}:${node.name} cannot duplicate definition.`);
        }
        dic[key] = 1;
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
function initNodes(nodes) {
    var currentNS = null;
    nodes.forEach(node=> {
        if (node.nodeType == NODE.NS) {
            currentNS = node;
        }

        if (node.nodeType == NODE.TYPE || node.nodeType == NODE.METHOD) {
            if (!currentNS) {
                throw new Error('ns definition is missing.');
            }

            node.ns = currentNS.name;
        }

        if (node.nodeType == NODE.TYPE) {
            node.fields.forEach(field=> {
                initTypeRef(currentNS, field.typeRef, `${node.name}_${camelName(field.name)}`, nodes);
            });
        }

        if (node.nodeType == NODE.METHOD) {
            if (node.argTypeRef) {
                initTypeRef(currentNS, node.argTypeRef, `${node.name}_Arg`, nodes);
            }
            if (node.retTypeRef) {
                initTypeRef(currentNS, node.retTypeRef, `${node.name}_Ret`, nodes);
            }
        }
    });
}

function checkAST(nodes) {
    initNodes(nodes);

    var nodeList = new NodeList(nodes);

    checkNamedNodes(nodeList);
    checkTypes(nodeList);
    checkMethods(nodeList);

    return nodeList;
}

module.exports = checkAST;