var GEN = require('./GEN.es6'),
    firstCharUpper = require('./firstCharUpper.es6');

class TypeRef {
    constructor(type, isArray) {
        this._type = type;
        this._isArray = isArray;
        this._isNodeType = !!this._type.nodeType;
    }

    fullName(lang, sep = '.') {
        if (this._isNodeType) {
            return `${this._type.ns.split('.').join(sep)}${sep}${this._type.name}`;
        }
        return this._type.getName(lang);
    }

    _typeName2(lang, prefix) {
        if (this._isNodeType) {
            return `${prefix}${firstCharUpper(this._type.name)}`;
        }
        return `${prefix}${firstCharUpper(this._type.getName(lang))}`;
    }

    nameTypeExpr(lang) {
        var a = this._isArray ? '[]' : '';
        return `${this.fullName(lang)}${a}`;
    }

    nameTypeExpr2(lang) {
        var a = '', b = '';
        this._isArray && ([a, b] = ['[', ']']);
        return `${a}${this.fullName(lang, '_')}${b}`;
    }

    getEmpty(lang) {
        if (!this._isNodeType && !this._isArray) {
            return this._type.getEmpty(lang);
        }

        var a = this._isArray ? '[]{}' : '()';
        return `new ${this.fullName(lang)}${a}`;
    }

    getEmpty2(lang) {
        if (this._isArray) {
            return '[]';
        }

        if (this._isNodeType) {
            return `${this.fullName(lang, '_')}.empty()`;
        }

        return this._type.getEmpty(lang);
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