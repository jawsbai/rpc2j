var P = require('path'),
    FileUtil = require('../common/FileUtil.es6'),
    replaceRegex = require('../common/replaceRegex.es6'),
    matchRegex = require('../common/matchRegex.es6');

function parseInclude(folder, code) {
    return replaceRegex(code, /\(include([\s\S]+?)\)/g, (mh, result)=> {
        var file = result.trim();
        var includeFile = P.join(folder, file);
        if (!file || !FileUtil.exists(includeFile)) {
            return '';
        }
        return FileUtil.readString(includeFile);
    });
}
function readFile(file) {
    var folder = P.dirname(file);
    var code = parseInclude(folder, FileUtil.readString(file));

    var inlines = [];
    var ix = 0;
    code = replaceRegex(code, /\{([\s\S]*?)\}/g, (mh, result)=> {
        var id = `#inline${ix++}`;
        inlines.push({id: id, list: matchRegex(result, /([\S]+)/g)});
        return id;
    });

    var list = matchRegex(code, /\(([\s\S]*?)\)/g).map(item=> {
        return matchRegex(item, /([\S]+)/g);
    });

    return {inlines: inlines, list: list};
}

module.exports = readFile;