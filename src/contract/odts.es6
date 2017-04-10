var GEN = require('./GEN.es6'),
    LANG = require('./LANG.es6');

class ODT {
    constructor() {
    }

    getName(lang) {
        return this[`getName_${lang}`]();
    }

    getEmpty(lang) {
        return this[`getEmpty_${lang}`]();
    }

    getRead(lang) {
        return this[`getRead_${lang}`]();
    }

    getWrite(lang) {
        return this[`getWrite_${lang}`]();
    }
}

class ODTBool extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'Boolean';
    }

    getEmpty_JAVA() {
        return 'false';
    }
}

class ODTByte extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'Byte';
    }

    getEmpty_JAVA() {
        return '0';
    }
}

class ODTShort extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'Short';
    }

    getEmpty_JAVA() {
        return '0';
    }
}

class ODTInt extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'int';
    }

    getEmpty_JAVA() {
        return '0';
    }
}

class ODTDate extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'Date';
    }

    getEmpty_JAVA() {
        return 'new Date()';
    }
}

class ODTString extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'String';
    }

    getEmpty_JAVA() {
        return '""';
    }
}

var map = {
    'bool': new ODTBool(),
    'byte': new ODTByte(),
    'short': new ODTShort(),
    'int': new ODTInt(),
    "date": new ODTDate(),
    'string': new ODTString()
};

module.exports = {
    map: map,
    types: [map.bool, map.byte, map.short, map.int, map.date, map.string]
};