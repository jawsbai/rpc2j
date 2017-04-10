module.exports = function (name) {
    var ss = name.split('');
    ss[0] = ss[0].toUpperCase();
    return ss.join('');
};