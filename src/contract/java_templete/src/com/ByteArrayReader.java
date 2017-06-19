
package com;

import java.util.Date;

public class ByteArrayReader {
    private final byte[] bytes;
    private int position;

    public ByteArrayReader(byte[] bytes) {
        this.bytes = bytes;
        position = 0;
    }

    public boolean readBoolean() {
        return readByte() == 1;
    }

    public byte readByte() {
        byte b = bytes[position];
        position++;
        return b;
    }

    public short readShort() {
        int ch1 = readByte() & 0xFF;
        int ch2 = readByte() & 0xFF;
        return (short) ((ch1 << 8) + ch2);
    }

    public int readInt() {
        int ch1 = readByte() & 0xFF;
        int ch2 = readByte() & 0xFF;
        int ch3 = readByte() & 0xFF;
        int ch4 = readByte() & 0xFF;
        return (ch1 << 24) + (ch2 << 16) + (ch3 << 8) + ch4;
    }

    public float readFloat() {
        return Float.parseFloat(readString());
    }

    public Date readDate() {
        return new Date(Long.parseLong(readString()));
    }

    public String readString() {
        int len = readInt();
        char[] chars = new char[len];
        for (int i = 0; i < len; i++) {
            chars[i] = (char) readInt();
        }
        return new String(chars, 0, len);
    }
}