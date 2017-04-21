package com;

import com.utils.Console;

import java.util.Date;

public class Main {

    public static void main(String[] args) {
        ByteArrayWriter writer = new ByteArrayWriter();
//        writer.writeInt(100);
//        writer.writeFloat(111.22f);
//        writer.writeBoolean(true);
//        writer.writeDate(new Date());
        writer.writeString("试试111哈哈哈哈");
        Console.log(writer.toArray());

        ByteArrayReader reader = new ByteArrayReader(writer.toArray());
//        Console.log(reader.readInt());
//        Console.log(reader.readFloat());
//        Console.log(reader.readBoolean());
//        Console.log(reader.readDate());
        Console.log(reader.readString());
    }
}
