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
}

module.exports = TypeRef;