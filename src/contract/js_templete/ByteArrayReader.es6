class ByteArrayReader {
    /**
     *
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        this._bytes = bytes;
        this._position = 0;
    }

    /**
     *
     * @return {boolean}
     */
    readBoolean() {
        return this.readByte() == 1;
    }

    /**
     *
     * @return {number}
     */
    readByte() {
        var b = this._bytes[this._position];
        this._position++;
        return b;
    }

    /**
     *
     * @return {number}
     */
    readShort() {
        var ch1 = this.readByte();
        var ch2 = this.readByte();
        return (ch1 << 8) + ch2;
    }

    /**
     *
     * @return {int}
     */
    readInt() {
        var ch1 = this.readByte();
        var ch2 = this.readByte();
        var ch3 = this.readByte();
        var ch4 = this.readByte();
        return (ch1 << 24) + (ch2 << 16) + (ch3 << 8) + ch4;
    }

    /**
     *
     * @return {number}
     */
    readFloat() {
        return parseFloat(this.readString());
    }

    /**
     *
     * @return {Date}
     */
    readDate() {
        return new Date(parseInt(this.readString()));
    }

    /**
     *
     * @return {String}
     */
    readString() {
        var len = this.readInt();
        var ss = [];
        for (var i = 0; i < len; i++) {
            ss.push(String.fromCharCode(this.readInt()));
        }
        return ss.join('');
    }
}