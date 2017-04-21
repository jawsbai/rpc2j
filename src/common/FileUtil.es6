var fs = require('fs'),
    P = require('path');

class FileUtil {
    static exists(path) {
        return fs.existsSync(path);
    }

    static readdir(path) {
        return fs.readdirSync(path).map(item=>P.join(path, item));
    }

    static readString(path, encoding = 'utf8') {
        return fs.readFileSync(path, encoding);
    }

    static writeString(path, content, encoding = 'utf8') {
        return fs.writeFileSync(path, content, encoding);
    }

    static readFile(path) {
        return fs.readFileSync(path);
    }

    static writeFile(path, content) {
        return fs.writeFileSync(path, content);
    }

    static copy(src, dest) {
        return fs.writeFileSync(dest, fs.readFileSync(src));
    }

    static stat(path) {
        return fs.statSync(path);
    }

    static getMTime(path) {
        return FileUtil.stat(path).mtime.getTime()
    }

    static mkdir(path) {
        fs.mkdirSync(path);
    }

    static unlink(path) {
        fs.unlinkSync(path);
    }

    static mkdirs(path, root = '') {
        path.split(P.sep).forEach(function (item) {
            root += P.sep + item;

            if (!FileUtil.exists(root)) {
                fs.mkdirSync(root);
            }
        });
    }
}

module.exports = FileUtil;