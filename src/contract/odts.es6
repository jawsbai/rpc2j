class ODT {
    constructor() {
    }
}

class ODTBool extends ODT {
    constructor() {
        super();
    }
}

class ODTByte extends ODT {
    constructor() {
        super();
    }
}

class ODTShort extends ODT {
    constructor() {
        super();
    }
}

class ODTInt extends ODT {
    constructor() {
        super();
    }
}

class ODTTime extends ODT {
    constructor() {
        super();
    }
}

class ODTString extends ODT {
    constructor() {
        super();
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