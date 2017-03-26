module.exports = function (input, regex) {
    var ss = [];
    input.replace(regex, function (mh) {
        var result = regex.exec(mh);
        regex.lastIndex = 0;
        ss.push(result[1]);
    });
    return ss;
};