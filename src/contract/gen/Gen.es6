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
}

module.exports = Gen;