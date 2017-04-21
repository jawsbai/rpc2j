package rpc2j;

import java.util.Date;

public class ByteArrayWriter {
    private static final int MAX_LEN = 1024;

    private class Node {
        byte[] data = new byte[MAX_LEN];
        Node next = null;
        int index = 0;
        int position = 0;
    }

    private Node _begin;
    private Node _current;

    public ByteArrayWriter() {
        _current = new Node();
        _begin = _current;
    }

    public int length() {
        return _current.index * MAX_LEN + _current.position;
    }

    public byte[] toArray() {
        byte[] bytes = new byte[length()];
        Node node = _begin;
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
        _current.data[_current.position] = value;
        _current.position++;

        if (_current.position == MAX_LEN) {
            Node current = new Node();
            current.index = _current.index + 1;
            _current.next = current;
            _current = current;
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