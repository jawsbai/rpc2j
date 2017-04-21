package com;

public class Console {
    public static void log(Object... args) {
        StringBuilder sb = new StringBuilder();
        for (Object arg : args) {
            sb.append(formatArg(arg)).append(", ");
        }
        deleteEnd(sb, 2);
        System.out.println(sb.toString());
    }

    private static void deleteEnd(StringBuilder sb, int deleteLen) {
        int length = sb.length();
        if (length > 0) {
            sb.delete(length - deleteLen, length);
        }
    }

    private static String formatArg(Object arg) {
        if (arg == null) {
            return "null";
        }
        if (arg instanceof byte[]) {
            byte[] arg1 = (byte[]) arg;
            StringBuilder sb = new StringBuilder();
            sb.append(String.format("<byte(%d) ", arg1.length));
            for (byte b : arg1) {
                sb.append((b & 0xFF)).append(" ");
            }
            deleteEnd(sb, 1);
            sb.append(">");
            return sb.toString();
        }

        return arg.toString();
    }
}
