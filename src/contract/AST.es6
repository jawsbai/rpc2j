var NODE = require('./NODE.es6'),
    checkAST = require('./checkAST.es6');

class AST {
    constructor(tokens) {
        this._tokens = tokens;
    }

    _parse_ns(list) {
        if (list.length < 2) {
            return null;
        }
        return {nodeType: NODE.NS, name: list[1]};
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
            nodeType: NODE.METHOD,
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
            nodeType: NODE.TYPE,
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
            nodeType: NODE.TYPE_FIELD,
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
            createType = this._parse_type([NODE.TYPE, '', ...inline.list]);
        }

        return {
            nodeType: NODE.TYPE_REF,
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
        return this[`_parse_${name}`];
    }

    _findInline(id) {
        return this._tokens.inlines.filter(item=>item.id == id)[0];
    }

    _trimList() {
        return this._tokens.list
            .filter(item=> item.length && this._findParse(item[0]));
    }

    parse() {
        var nodes = [];

        this._trimList().forEach(list=> {
            var parse = this._findParse(list[0]);
            var node = parse.bind(this)(list);
            if (node) {
                nodes.push(node);
            }
        });

        checkAST(nodes);

        return nodes;
    }
}

module.exports = AST;