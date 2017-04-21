
        package rpc2j;
        import java.util.Date;
        public class TypeReader extends rpc2j.ByteArrayReader {
            public TypeReader(byte[] bytes){
                super(bytes);
            }
            
            
            public boolean[] readBooleanArray(){
                int length=readInt();
                boolean[] array=new boolean[length];
                for(int i=0;i<length;i++){
                    array[i]=readBoolean();
                }
                return array;
            }

            public byte[] readByteArray(){
                int length=readInt();
                byte[] array=new byte[length];
                for(int i=0;i<length;i++){
                    array[i]=readByte();
                }
                return array;
            }

            public short[] readShortArray(){
                int length=readInt();
                short[] array=new short[length];
                for(int i=0;i<length;i++){
                    array[i]=readShort();
                }
                return array;
            }

            public int[] readIntArray(){
                int length=readInt();
                int[] array=new int[length];
                for(int i=0;i<length;i++){
                    array[i]=readInt();
                }
                return array;
            }

            public Date[] readDateArray(){
                int length=readInt();
                Date[] array=new Date[length];
                for(int i=0;i<length;i++){
                    array[i]=readDate();
                }
                return array;
            }

            public String[] readStringArray(){
                int length=readInt();
                String[] array=new String[length];
                for(int i=0;i<length;i++){
                    array[i]=readString();
                }
                return array;
            }
            
            
            public a.ABS readABS(){
                return new a.ABS(
                
                readIntArray()
                );
            }
            public a.ABS[] readABSArray(){
                int length=readInt();
                a.ABS[] array=new a.ABS[length];
                for(int i=0;i<length;i++){
                    array[i]=readABS();
                }
                return array;
            }

            public common.UserInfo readUserInfo(){
                return new common.UserInfo(
                
                readString(),
                readBooleanArray(),
                readUserInfo_Aa2(),
                readUserInfo_SssArray()
                );
            }
            public common.UserInfo[] readUserInfoArray(){
                int length=readInt();
                common.UserInfo[] array=new common.UserInfo[length];
                for(int i=0;i<length;i++){
                    array[i]=readUserInfo();
                }
                return array;
            }

            public common.UserInfo334 readUserInfo334(){
                return new common.UserInfo334(
                
                readIntArray()
                );
            }
            public common.UserInfo334[] readUserInfo334Array(){
                int length=readInt();
                common.UserInfo334[] array=new common.UserInfo334[length];
                for(int i=0;i<length;i++){
                    array[i]=readUserInfo334();
                }
                return array;
            }

            public WWW.SSS readSSS(){
                return new WWW.SSS(
                
                readInt(),
                readString()
                );
            }
            public WWW.SSS[] readSSSArray(){
                int length=readInt();
                WWW.SSS[] array=new WWW.SSS[length];
                for(int i=0;i<length;i++){
                    array[i]=readSSS();
                }
                return array;
            }

            public common.UserInfo_Aa2 readUserInfo_Aa2(){
                return new common.UserInfo_Aa2(
                
                readInt(),
                readInt()
                );
            }
            public common.UserInfo_Aa2[] readUserInfo_Aa2Array(){
                int length=readInt();
                common.UserInfo_Aa2[] array=new common.UserInfo_Aa2[length];
                for(int i=0;i<length;i++){
                    array[i]=readUserInfo_Aa2();
                }
                return array;
            }

            public common.UserInfo_Sss readUserInfo_Sss(){
                return new common.UserInfo_Sss(
                
                readInt(),
                readString()
                );
            }
            public common.UserInfo_Sss[] readUserInfo_SssArray(){
                int length=readInt();
                common.UserInfo_Sss[] array=new common.UserInfo_Sss[length];
                for(int i=0;i<length;i++){
                    array[i]=readUserInfo_Sss();
                }
                return array;
            }

            public common.getTime2_Arg readGetTime2_Arg(){
                return new common.getTime2_Arg(
                
                readInt()
                );
            }
            public common.getTime2_Arg[] readGetTime2_ArgArray(){
                int length=readInt();
                common.getTime2_Arg[] array=new common.getTime2_Arg[length];
                for(int i=0;i<length;i++){
                    array[i]=readGetTime2_Arg();
                }
                return array;
            }

            public common.getTime2_Ret readGetTime2_Ret(){
                return new common.getTime2_Ret(
                
                readString()
                );
            }
            public common.getTime2_Ret[] readGetTime2_RetArray(){
                int length=readInt();
                common.getTime2_Ret[] array=new common.getTime2_Ret[length];
                for(int i=0;i<length;i++){
                    array[i]=readGetTime2_Ret();
                }
                return array;
            }

            public common.getTime3_Arg readGetTime3_Arg(){
                return new common.getTime3_Arg(
                
                readInt(),
                readStringArray()
                );
            }
            public common.getTime3_Arg[] readGetTime3_ArgArray(){
                int length=readInt();
                common.getTime3_Arg[] array=new common.getTime3_Arg[length];
                for(int i=0;i<length;i++){
                    array[i]=readGetTime3_Arg();
                }
                return array;
            }

            public common.getTime3_Ret readGetTime3_Ret(){
                return new common.getTime3_Ret(
                
                readInt(),
                readString()
                );
            }
            public common.getTime3_Ret[] readGetTime3_RetArray(){
                int length=readInt();
                common.getTime3_Ret[] array=new common.getTime3_Ret[length];
                for(int i=0;i<length;i++){
                    array[i]=readGetTime3_Ret();
                }
                return array;
            }
        }