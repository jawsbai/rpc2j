
        package rpc2j;
        public class TypeReader extends rpc2j.ByteArrayReader {
            
            public a.ABS readABS(){
                return a.ABS.create(
                
                readInt()
                );
            }

            public common.UserInfo readUserInfo(){
                return common.UserInfo.create(
                
                readString(),
                readBoolean(),
                readUserInfo_Aa2(),
                readUserInfo_Sss()
                );
            }

            public common.UserInfo334 readUserInfo334(){
                return common.UserInfo334.create(
                
                readInt()
                );
            }

            public WWW.SSS readSSS(){
                return WWW.SSS.create(
                
                readInt(),
                readString()
                );
            }

            public common.UserInfo_Aa2 readUserInfo_Aa2(){
                return common.UserInfo_Aa2.create(
                
                readInt(),
                readInt()
                );
            }

            public common.UserInfo_Sss readUserInfo_Sss(){
                return common.UserInfo_Sss.create(
                
                readInt(),
                readString()
                );
            }

            public common.getTime2_Arg readGetTime2_Arg(){
                return common.getTime2_Arg.create(
                
                readInt()
                );
            }

            public common.getTime2_Ret readGetTime2_Ret(){
                return common.getTime2_Ret.create(
                
                readString()
                );
            }

            public common.getTime3_Arg readGetTime3_Arg(){
                return common.getTime3_Arg.create(
                
                readInt(),
                readString()
                );
            }

            public common.getTime3_Ret readGetTime3_Ret(){
                return common.getTime3_Ret.create(
                
                readInt(),
                readString()
                );
            }
        }