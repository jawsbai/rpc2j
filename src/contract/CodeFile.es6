class CodeFile {
    constructor(ns, name) {
        this._ns = ns;
        this._name = name;
        this._codes = [];
    }

    getCode() {
        return this._codes.join('');
    }

    append(str) {
        this._codes.push(str);
    }

    appendLine(line) {
        this._codes.push(line + '\n');
    }
}

module.exports = CodeFile;