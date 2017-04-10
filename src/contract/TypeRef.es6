var GEN = require('./GEN.es6'),
    firstCharUpper = require('./firstCharUpper.es6');

class TypeRef {
    constructor(type) {
        this._type = type;
        this._isNodeType = !!this._type.nodeType;
    }

    getFullName(lang) {
        if (this._isNodeType) {
            return `${this._type.ns}.${this._type.name}`;
        }
        return this._type.getName(lang);
    }

    getEmpty(lang) {
        if (this._isNodeType) {
            return `${this._type.ns}.${this._type.name}.newEmpty()`;
        }
        return this._type.getEmpty(lang);
    }

    getRead(lang) {
        if (this._isNodeType) {
            return `read${firstCharUpper(this._type.name)}`;
        }
        return `read${firstCharUpper(this._type.getName(lang))}`;
    }

    getWrite(lang) {
        if (this._isNodeType) {
            return `write${firstCharUpper(this._type.name)}`;
        }
        return `write${firstCharUpper(this._type.getName(lang))}`;
    }
}

module.exports = TypeRef;