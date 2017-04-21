var GEN = require('./GEN.es6'),
    firstCharUpper = require('./firstCharUpper.es6');

class TypeRef {
    constructor(type, isArray) {
        this._type = type;
        this._isArray = isArray;
        this._isNodeType = !!this._type.nodeType;
    }

    _typeName(lang) {
        if (this._isNodeType) {
            return `${this._type.ns}.${this._type.name}`;
        }
        return this._type.getName(lang);
    }

    _typeName2(lang, prefix) {
        if (this._isNodeType) {
            return `${prefix}${firstCharUpper(this._type.name)}`;
        }
        return `${prefix}${firstCharUpper(this._type.getName(lang))}`;
    }

    getFullName(lang) {
        var a = this._isArray ? '[]' : '';
        return `${this._typeName(lang)}${a}`;
    }

    getEmpty(lang) {
        if (!this._isNodeType && !this._isArray) {
            return this._type.getEmpty(lang);
        }

        var a = this._isArray ? '[]{}' : '()';
        return `new ${this._typeName(lang)}${a}`;
    }

    getRead(lang) {
        var a = this._isArray ? 'Array' : '';
        return `${this._typeName2(lang, 'read')}${a}`;
    }

    getWrite(lang) {
        var a = this._isArray ? 'Array' : '';
        return `${this._typeName2(lang, 'write')}${a}`;
    }
}

module.exports = TypeRef;