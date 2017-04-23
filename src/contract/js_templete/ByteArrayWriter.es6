const MAX_LEN = 3;

function Node() {
    return {
        data: new Uint8Array(MAX_LEN),
        next: null,
        index: 0,
        position: 0
    }
}

class ByteArrayWriter {
    constructor() {
        this._current = Node();
        this._begin = this._current;
    }

    /**
     *
     * @private
     */
    _arraycopy(src, srcPos, dest, destPos, length) {
        for (var si = srcPos, di = destPos, len = destPos + length;
             di < len;
             si++, di++) {
            dest[di] = src[si];
        }
    }

    /**
     *
     * @return {number}
     */
    get length() {
        return this._current.index * MAX_LEN + this._current.position;
    }

    /**
     *
     * @return {Uint8Array}
     */
    toArray() {
        var bytes = new Uint8Array(this.length);
        var node = this._begin;
        while (node != null) {
            this._arraycopy(node.data, 0, bytes, node.index * MAX_LEN, node.position);
            // console.log(node.index, node.position);
            node = node.next;
        }
        return bytes;
    }

    /**
     *
     * @param {boolean} value
     */
    writeBoolean(value) {
        this.writeByte(value ? 1 : 0);
    }

    /**
     *
     * @param {number} value
     */
    writeByte(value) {
        this._current.data[this._current.position] = value;
        this._current.position++;

        if (this._current.position == MAX_LEN) {
            var current = Node();
            current.index = this._current.index + 1;
            this._current.next = current;
            this._current = current;
        }
    }

    /**
     *
     * @param {number} value
     */
    writeShort(value) {
        this.writeByte((value >>> 8) & 0xFF);
        this.writeByte((value) & 0xFF);
    }

    /**
     *
     * @param {number} value
     */
    writeInt(value) {
        this.writeByte((value >>> 24) & 0xFF);
        this.writeByte((value >>> 16) & 0xFF);
        this.writeByte((value >>> 8) & 0xFF);
        this.writeByte((value) & 0xFF);
    }

    /**
     *
     * @param {number} value
     */
    writeFloat(value) {
        this.writeString(value.toString());
    }

    /**
     *
     * @param {Date} value
     */
    writeDate(value) {
        this.writeString(value.getTime().toString());
    }

    /**
     *
     * @param {string} value
     */
    writeString(value) {
        var len = value.length;
        this.writeInt(len);
        for (var i = 0; i < len; i++) {
            this.writeInt(value.charCodeAt(i));
        }
    }
}