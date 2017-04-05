var LANG = require('./LANG.es6');

class ODT {
    constructor() {
    }

    getName(lang) {
        return this[`getName_${lang}`]();
    }
}

class ODTBool extends ODT {
    constructor() {
        super();
    }

    getName_JAVA(){
        return 'boolean';
    }
}

class ODTByte extends ODT {
    constructor() {
        super();
    }

    getName_JAVA(){
        return 'Byte';
    }
}

class ODTShort extends ODT {
    constructor() {
        super();
    }

    getName_JAVA(){
        return 'Short';
    }
}

class ODTInt extends ODT {
    constructor() {
        super();
    }

    getName_JAVA(){
        return 'Int';
    }
}

class ODTTime extends ODT {
    constructor() {
        super();
    }

    getName_JAVA(){
        return 'Date';
    }
}

class ODTString extends ODT {
    constructor() {
        super();
    }

    getName_JAVA(){
        return 'String';
    }
}

module.exports = {
    'bool': new ODTBool(),
    'byte': new ODTByte(),
    'short': new ODTShort(),
    'int': new ODTInt(),
    'Time': new ODTTime(),
    'string': new ODTString()
};