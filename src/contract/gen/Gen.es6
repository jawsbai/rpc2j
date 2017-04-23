var odts = require('../odts.es6'),
    P = require('path'),
    FileUtil = require('../../common/FileUtil.es6');

class Gen {
    constructor(gen, nodeList) {
        this._gen = gen;
        this._nodeList = nodeList;
    }

    get lang() {
        return this._gen.lang;
    }

    get end() {
        return this._gen.end;
    }

    getTypeFieldNames(typeNode) {
        return typeNode.fields.map(field=>field.name);
    }

    mapTypeFields(typeNode, callback) {
        return typeNode.fields.map(field=>callback(field, field.typeRef.type));
    }

    mapODTS(callback) {
        return odts.types.map(type=>callback(type, type.getName(this.lang)));
    }

    mapTypes(callback) {
        return this._nodeList.findTypes().map(typeNode=>callback(typeNode, typeNode.ns, typeNode.name));
    }

    mapMethods(methods, callback) {
        return methods.map((method, index)=> {
            var a = method.argTypeRef;
            var r = method.retTypeRef;
            return callback(index, method, a, r, a ? a.type : null, r ? r.type : null);
        });
    }

    methodsGroupByNS() {
        var nsDic = {};
        this._nodeList.findMethods().forEach(item=> {
            if (!nsDic[item.ns]) {
                nsDic[item.ns] = [];
            }
            nsDic[item.ns].push(item);
        });
        return nsDic;
    }

    writeFile(codeFile, extname) {
        var ns = codeFile.ns.split('.');
        var folder = this._gen.path;
        ns.forEach(n=> {
            folder = P.join(folder, n);
            if (!FileUtil.exists(folder)) {
                FileUtil.mkdir(folder);
            }
        });
        var file = P.join(folder, codeFile.name + extname);
        FileUtil.writeString(file, codeFile.getCode());
    }

    writeAll(code) {
        FileUtil.writeString(this._gen.path, code);
    }
}

module.exports = Gen;