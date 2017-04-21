package com;

import common.UserInfo;
import common.UserInfo_Aa2;
import common.UserInfo_Sss;
import rpc2j.TypeReader;
import rpc2j.TypeWriter;

public class Main {

    public static void main(String[] args) {
        UserInfo userInfo = new UserInfo("我试试是111", new boolean[]{false, false}, new UserInfo_Aa2(1, 2), new UserInfo_Sss[]{});
        TypeWriter w = new TypeWriter();
        w.writeUserInfo(userInfo);

        Console.log(w.toArray());

        TypeReader r = new TypeReader(w.toArray());
        UserInfo u = r.readUserInfo();

        Console.log(u.aa);

    }
}
