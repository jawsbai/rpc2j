
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
                readFD_UserInfo_Aa2(),
                readFD_UserInfo_SssArray()
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

            public common.FD_UserInfo_Aa2 readFD_UserInfo_Aa2(){
                return new common.FD_UserInfo_Aa2(
                
                readInt(),
                readInt()
                );
            }
            public common.FD_UserInfo_Aa2[] readFD_UserInfo_Aa2Array(){
                int length=readInt();
                common.FD_UserInfo_Aa2[] array=new common.FD_UserInfo_Aa2[length];
                for(int i=0;i<length;i++){
                    array[i]=readFD_UserInfo_Aa2();
                }
                return array;
            }

            public common.FD_UserInfo_Sss readFD_UserInfo_Sss(){
                return new common.FD_UserInfo_Sss(
                
                readInt(),
                readString()
                );
            }
            public common.FD_UserInfo_Sss[] readFD_UserInfo_SssArray(){
                int length=readInt();
                common.FD_UserInfo_Sss[] array=new common.FD_UserInfo_Sss[length];
                for(int i=0;i<length;i++){
                    array[i]=readFD_UserInfo_Sss();
                }
                return array;
            }

            public common.METHOD_ARG_getTime2 readMETHOD_ARG_getTime2(){
                return new common.METHOD_ARG_getTime2(
                
                readInt()
                );
            }
            public common.METHOD_ARG_getTime2[] readMETHOD_ARG_getTime2Array(){
                int length=readInt();
                common.METHOD_ARG_getTime2[] array=new common.METHOD_ARG_getTime2[length];
                for(int i=0;i<length;i++){
                    array[i]=readMETHOD_ARG_getTime2();
                }
                return array;
            }

            public common.METHOD_RET_getTime2 readMETHOD_RET_getTime2(){
                return new common.METHOD_RET_getTime2(
                
                readString()
                );
            }
            public common.METHOD_RET_getTime2[] readMETHOD_RET_getTime2Array(){
                int length=readInt();
                common.METHOD_RET_getTime2[] array=new common.METHOD_RET_getTime2[length];
                for(int i=0;i<length;i++){
                    array[i]=readMETHOD_RET_getTime2();
                }
                return array;
            }

            public aaaaaaaaaa.METHOD_RET_getAAAAAAAAAa readMETHOD_RET_getAAAAAAAAAa(){
                return new aaaaaaaaaa.METHOD_RET_getAAAAAAAAAa(
                
                readInt(),
                readString()
                );
            }
            public aaaaaaaaaa.METHOD_RET_getAAAAAAAAAa[] readMETHOD_RET_getAAAAAAAAAaArray(){
                int length=readInt();
                aaaaaaaaaa.METHOD_RET_getAAAAAAAAAa[] array=new aaaaaaaaaa.METHOD_RET_getAAAAAAAAAa[length];
                for(int i=0;i<length;i++){
                    array[i]=readMETHOD_RET_getAAAAAAAAAa();
                }
                return array;
            }

            public aaaaaaaaaa.METHOD_ARG_getTime3 readMETHOD_ARG_getTime3(){
                return new aaaaaaaaaa.METHOD_ARG_getTime3(
                
                readInt(),
                readStringArray()
                );
            }
            public aaaaaaaaaa.METHOD_ARG_getTime3[] readMETHOD_ARG_getTime3Array(){
                int length=readInt();
                aaaaaaaaaa.METHOD_ARG_getTime3[] array=new aaaaaaaaaa.METHOD_ARG_getTime3[length];
                for(int i=0;i<length;i++){
                    array[i]=readMETHOD_ARG_getTime3();
                }
                return array;
            }

            public aaaaaaaaaa.METHOD_RET_getTime3 readMETHOD_RET_getTime3(){
                return new aaaaaaaaaa.METHOD_RET_getTime3(
                
                readInt(),
                readString()
                );
            }
            public aaaaaaaaaa.METHOD_RET_getTime3[] readMETHOD_RET_getTime3Array(){
                int length=readInt();
                aaaaaaaaaa.METHOD_RET_getTime3[] array=new aaaaaaaaaa.METHOD_RET_getTime3[length];
                for(int i=0;i<length;i++){
                    array[i]=readMETHOD_RET_getTime3();
                }
                return array;
            }

            public aaaaaaaaaa.METHOD_ARG_fillPlayers readMETHOD_ARG_fillPlayers(){
                return new aaaaaaaaaa.METHOD_ARG_fillPlayers(
                
                readInt(),
                readStringArray()
                );
            }
            public aaaaaaaaaa.METHOD_ARG_fillPlayers[] readMETHOD_ARG_fillPlayersArray(){
                int length=readInt();
                aaaaaaaaaa.METHOD_ARG_fillPlayers[] array=new aaaaaaaaaa.METHOD_ARG_fillPlayers[length];
                for(int i=0;i<length;i++){
                    array[i]=readMETHOD_ARG_fillPlayers();
                }
                return array;
            }

            public aaaaaaaaaa.METHOD_RET_fillPlayers readMETHOD_RET_fillPlayers(){
                return new aaaaaaaaaa.METHOD_RET_fillPlayers(
                
                readInt(),
                readString()
                );
            }
            public aaaaaaaaaa.METHOD_RET_fillPlayers[] readMETHOD_RET_fillPlayersArray(){
                int length=readInt();
                aaaaaaaaaa.METHOD_RET_fillPlayers[] array=new aaaaaaaaaa.METHOD_RET_fillPlayers[length];
                for(int i=0;i<length;i++){
                    array[i]=readMETHOD_RET_fillPlayers();
                }
                return array;
            }
        }