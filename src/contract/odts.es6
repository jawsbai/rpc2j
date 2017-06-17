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
}

class ODTBool extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'boolean';
    }

    getEmpty_JAVA() {
        return 'false';
    }

    getName_JS() {
        return 'boolean';
    }

    getEmpty_JS() {
        return 'false';
    }
}

class ODTByte extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'byte';
    }

    getEmpty_JAVA() {
        return '0';
    }

    getName_JS() {
        return 'byte';
    }

    getEmpty_JS() {
        return '0';
    }
}

class ODTShort extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'short';
    }

    getEmpty_JAVA() {
        return '0';
    }

    getName_JS() {
        return 'short';
    }

    getEmpty_JS() {
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

    getName_JS() {
        return 'int';
    }

    getEmpty_JS() {
        return '0';
    }
}

class ODTTime extends ODT {
    constructor() {
        super();
    }

    getName_JAVA() {
        return 'Date';
    }

    getEmpty_JAVA() {
        return 'new Date()';
    }

    getName_JS() {
        return 'Date';
    }

    getEmpty_JS() {
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

    getName_JS() {
        return 'string';
    }

    getEmpty_JS() {
        return '""';
    }
}

var map = {
    'bool': new ODTBool(),
    'byte': new ODTByte(),
    'short': new ODTShort(),
    'int': new ODTInt(),
    "time": new ODTTime(),
    'string': new ODTString()
};

module.exports = {
    map: map,
    types: [map.bool, map.byte, map.short, map.int, map.time, map.string]
};