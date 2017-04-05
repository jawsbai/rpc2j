var CodeFile = require('./CodeFile.es6'),
    LANG = require('./LANG.es6');

var makeTypeLangs = {};
makeTypeLangs[LANG.JAVA] = function (lang, typeNode, codeFile) {
    var fields = typeNode.fields.map(field=> {
        return `public ${field.typeRef.type.getFullName(lang)} ${field.name};`;
    }).join('\n');

    var emptys = typeNode.fields.map(field=> {
        return `obj.${field.name}=null;`;
    }).join('\n');

    var creates = typeNode.fields.map(field=> {
        return `obj.${field.name}=null;`;
    }).join('\n');

    codeFile.append(`public class ${typeNode.name} {
            ${fields}
            
            public static ${typeNode.name} newEmpty(){
                var obj=new ${typeNode.name}();
                ${emptys}
                return obj;
            }
            
            public static ${typeNode.name} create(){
                var obj=new ${typeNode.name}();
                ${creates}
                return obj;
            }
        }`);
};

function makeTypes(gen, nodeList) {
    return nodeList.findTypes().map(typeNode=> {
        var codeFile = new CodeFile(typeNode.ns, typeNode.name);
        makeTypeLangs[gen.lang](gen.lang, typeNode, codeFile);
        console.log('----------------');
        console.log(codeFile.getCode());
    });
}
function make(gen, nodeList) {
    makeTypes(gen, nodeList);
}

function genCode(nodeList) {
    nodeList.findGens().forEach(node=>make(node, nodeList));
}

module.exports = genCode;