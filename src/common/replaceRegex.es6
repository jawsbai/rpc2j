module.exports = function (input, regex, callback) {
    return input.replace(regex, function (mh) {
        var result = regex.exec(mh);
        regex.lastIndex = 0;
        return callback(mh, result[1]);
    });
};