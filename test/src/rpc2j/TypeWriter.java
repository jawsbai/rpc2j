
        package rpc2j;
        public class TypeWriter extends rpc2j.ByteArrayWriter {
            
            public void writeABS(a.ABS value){
                
                writeInt(value.ddd);
            }

            public void writeUserInfo(common.UserInfo value){
                
                writeString(value.aa);

                writeBoolean(value.name);

                writeUserInfo_Aa2(value.aa2);

                writeUserInfo_Sss(value.sss);
            }

            public void writeUserInfo334(common.UserInfo334 value){
                
                writeInt(value.ss);
            }

            public void writeSSS(WWW.SSS value){
                
                writeInt(value.ss);

                writeString(value.cc);
            }

            public void writeUserInfo_Aa2(common.UserInfo_Aa2 value){
                
                writeInt(value.abc);

                writeInt(value.test);
            }

            public void writeUserInfo_Sss(common.UserInfo_Sss value){
                
                writeInt(value.sss);

                writeString(value.cbd);
            }

            public void writeGetTime2_Arg(common.getTime2_Arg value){
                
                writeInt(value.www);
            }

            public void writeGetTime2_Ret(common.getTime2_Ret value){
                
                writeString(value.sss);
            }

            public void writeGetTime3_Arg(common.getTime3_Arg value){
                
                writeInt(value.name);

                writeString(value.sss);
            }

            public void writeGetTime3_Ret(common.getTime3_Ret value){
                
                writeInt(value.abc);

                writeString(value.sss);
            }
        }