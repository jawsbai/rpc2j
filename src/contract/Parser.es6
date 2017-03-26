var odts = require('./odts.es6');

const NS = 'ns';
const TYPE = 'type';
const TYPE_FIELD = 'typefield';
const TYPE_REF = 'typeref';
const METHOD = 'method';

class Parser {
    constructor(tokens) {
        this._tokens = tokens;
    }

    _parse_ns(list) {
        if (list.length < 2) {
            return null;
        }
        return {nodeType: NS, name: list[1]};
    }

    _parse_method(list) {
        if (list.length < 3) {
            return null;
        }

        var argRef = null,
            retRef = null;
        if (list.length > 3) {
            argRef = this._parseTypeRef(list[3]);
        }
        if (list.length > 4) {
            retRef = this._parseTypeRef(list[4]);
        }
        return {
            nodeType: METHOD,
            ns: '',
            end: list[1],
            name: list[2],
            argTypeRef: argRef,
            retTypeRef: retRef
        };
    }

    _parse_type(list) {
        if (list.length < 3) {
            return null;
        }
        var fields = [];
        for (var i = 2; i < list.length; i++) {
            var field = this._parseTypeField(list[i]);
            if (field) {
                fields.push(field);
            }
        }
        return {
            nodeType: TYPE,
            ns: '',
            name: list[1],
            fields: fields
        };
    }

    _parseTypeField(expr) {
        var mh = expr.match(/(.+)\:(.+)/);
        if (!mh) {
            return null;
        }
        var ref = this._parseTypeRef(mh[2]);
        if (!ref) {
            return null;
        }
        return {
            nodeType: TYPE_FIELD,
            name: mh[1],
            typeRef: ref
        };
    }

    _parseTypeRef(expr) {
        var mh = expr.match(/\[(.*)\]/);
        var isArray = !!mh;
        var name = expr;

        if (isArray) {
            name = mh[1];
        }
        var [ns,n] = this._parseFullName(name);
        if (!n) {
            return null;
        }

        var createType = null;
        var inline = this._findInline(n);
        if (inline) {
            if (!inline.list.length) {
                return null;
            }
            n = '';
            createType = this._parse_type([TYPE, '', ...inline.list]);
        }

        return {
            nodeType: TYPE_REF,
            ns: ns,
            name: n,
            isArray: isArray,
            createType: createType
        };
    }

    _parseFullName(name) {
        var ss = name.split('.');
        var n = ss.pop();
        return [ss.join('.'), n];
    }

    _findParse(name) {
        return this[`_parse_${name}`].bind(this);
    }

    _findInline(id) {
        return this._tokens.inlines.filter(item=>item.id == id)[0];
    }

    _camelName(name) {
        var ss = name.split('');
        ss[0] = ss[0].toUpperCase();
        return ss.join('');
    }

    _trimTypeRef(ns, typeRef, name, nodes) {
        if (!typeRef.ns) {
            typeRef.ns = ns.name;
        }

        if (!typeRef.createType) {
            return null;
        }

        typeRef.name = name;

        var createType = typeRef.createType;
        createType.ns = typeRef.ns;
        createType.name = typeRef.name;

        createType.fields.forEach(field=> {
            if (!field.typeRef.ns) {
                field.typeRef.ns = ns.name;
            }
        });

        typeRef.createType = null;
        nodes.push(createType);
    }

    _trimList() {
        return this._tokens.list
            .filter(item=> item.length && this._findParse(item[0]));
    }

    _findNode(nodes, node) {
        return nodes.filter(item=> {
                return item.ns == node.ns &&
                    item.name == node.name &&
                    item != node;
            }).length > 0;
    }

    _checkNodes(nodes) {
        var notNSNodes = nodes.filter(node=>node.nodeType != NS);
        notNSNodes.forEach(node=> {
            if (this._findNode(notNSNodes, node)) {
                throw new Error(`(${node.nodeType} ${node.name} ...) cannot duplicate definition.`);
            }

            if (node.nodeType == TYPE) {
                this._checkType(node);
            }
        });
    }

    _checkType(node) {
        node.fields.forEach(field=> {
            var find = node.fields.filter(item=>item.name == field.name && item != field).length > 0;
            if (find) {
                throw new Error(`${node.name} field:${field.name} cannot duplicate definition.`);
            }
            var typeRef = field.typeRef;
            console.log(typeRef.name);
        });
    }

    parse() {
        var nodes = [];
        var ns = null;

        this._trimList().forEach(list=> {
            var parse = this._findParse(list[0]);
            var node = parse(list);
            if (!node) {
                return;
            }

            if (node.nodeType == NS) {
                ns = node;
            }

            if (node.nodeType == TYPE || node.nodeType == METHOD) {
                if (!ns) {
                    throw new Error('ns definition is missing.');
                }
                if (!node.ns) {
                    node.ns = ns.name;
                }
            }

            if (node.nodeType == TYPE) {
                node.fields.forEach(field=> {
                    this._trimTypeRef(ns, field.typeRef, `${node.name}_${this._camelName(field.name)}`, nodes);
                });
            }

            if (node.nodeType == METHOD) {
                if (node.argTypeRef) {
                    this._trimTypeRef(ns, node.argTypeRef, `${node.name}_Arg`, nodes);
                }
                if (node.retTypeRef) {
                    this._trimTypeRef(ns, node.retTypeRef, `${node.name}_Ret`, nodes);
                }
            }

            nodes.push(node);
        });

        this._checkNodes(nodes);

        return nodes;
    }
}

module.exports = Parser;