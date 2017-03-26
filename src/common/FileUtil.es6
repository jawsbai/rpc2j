var fs = require('fs'),
    P = require('path');

function exists(path) {
    return fs.existsSync(path);
}

module.exports = {
    exists: exists,

    readdir: function (path) {
        var list = [];
        fs.readdirSync(path).forEach(function (item) {
            list.push(P.join(path, item));
        });
        return list;
    },

    readString: function (path, encoding = 'utf8') {
        return fs.readFileSync(path, encoding);
    },

    writeString: function (path, content, encoding = 'utf8') {
        return fs.writeFileSync(path, content, encoding);
    },

    readFile: function (path) {
        return fs.readFileSync(path);
    },

    writeFile: function (path, content) {
        return fs.writeFileSync(path, content);
    },

    copy: function (src, dest) {
        return fs.writeFileSync(dest, fs.readFileSync(src));
    },

    stat: function (path) {
        return fs.statSync(path);
    },

    mkdir: function (path) {
        fs.mkdirSync(path);
    },

    unlink: function (path) {
        fs.unlinkSync(path);
    },

    mkdirs: function (path, root = '') {
        path.split(P.sep).forEach(function (item) {
            root += P.sep + item;

            if (!exists(root)) {
                fs.mkdirSync(root);
            }
        });
    }
};