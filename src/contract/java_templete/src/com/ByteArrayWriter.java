package com;

import java.util.Date;

public class ByteArrayWriter {
    private static final int MAX_LEN = 1024;

    private class Node {
        byte[] data = new byte[MAX_LEN];
        Node next = null;
        int index = 0;
        int position = 0;
    }

    private Node begin;
    private Node current;

    public ByteArrayWriter() {
        current = new Node();
        begin = current;
    }

    public int length() {
        return current.index * MAX_LEN + current.position;
    }

    public byte[] toArray() {
        byte[] bytes = new byte[length()];
        Node node = begin;
        while (node != null) {
            System.arraycopy(node.data, 0, bytes, node.index * MAX_LEN, node.position);
//            Console.log(node.index, node.position);
            node = node.next;
        }
        return bytes;
    }

    public void writeBoolean(boolean value) {
        writeByte((byte) (value ? 1 : 0));
    }

    public void writeByte(byte value) {
        current.data[current.position] = value;
        current.position++;

        if (current.position == MAX_LEN) {
            Node current = new Node();
            current.index = this.current.index + 1;
            this.current.next = current;
            this.current = current;
        }
    }

    public void writeShort(short value) {
        writeByte((byte) ((value >>> 8) & 0xFF));
        writeByte((byte) ((value) & 0xFF));
    }

    public void writeInt(int value) {
        writeByte((byte) ((value >>> 24) & 0xFF));
        writeByte((byte) ((value >>> 16) & 0xFF));
        writeByte((byte) ((value >>> 8) & 0xFF));
        writeByte((byte) ((value) & 0xFF));
    }

    public void writeFloat(float value) {
        writeString(Float.toString(value));
    }

    public void writeDate(Date value) {
        writeString(Long.toString(value.getTime()));
    }

    public void writeString(String value) {
        int len = value.length();
        writeInt(len);
        for (int i = 0; i < len; i++) {
            writeInt(value.charAt(i));
        }
    }
}