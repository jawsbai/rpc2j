class CodeFile {
    constructor(ns, name) {
        this._ns = ns;
        this._name = name;
        this._codes = [];
    }

    get ns() {
        return this._ns;
    }

    get name() {
        return this._name;
    }

    getCode() {
        return this._codes.join('');
    }

    append(str) {
        this._codes.push(str);
        return this;
    }

    appendLine(line) {
        this._codes.push(line + '\n');
        return this;
    }
}

module.exports = CodeFile;