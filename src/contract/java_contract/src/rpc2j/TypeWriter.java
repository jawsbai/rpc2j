
        package rpc2j;
        import java.util.Date;
        public class TypeWriter extends rpc2j.ByteArrayWriter {
            
            
            public void writeBooleanArray(boolean[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeBoolean(array[i]);
                }
            }

            public void writeByteArray(byte[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeByte(array[i]);
                }
            }

            public void writeShortArray(short[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeShort(array[i]);
                }
            }

            public void writeIntArray(int[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeInt(array[i]);
                }
            }

            public void writeDateArray(Date[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeDate(array[i]);
                }
            }

            public void writeStringArray(String[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeString(array[i]);
                }
            }
            
            
            public void writeABS(a.ABS value){
                
                writeIntArray(value.ddd);
            }
            public void writeABSArray(a.ABS[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeABS(array[i]);
                }                
            }

            public void writeUserInfo(common.UserInfo value){
                
                writeString(value.aa);

                writeBooleanArray(value.name);

                writeFD_UserInfo_Aa2(value.aa2);

                writeFD_UserInfo_SssArray(value.sss);
            }
            public void writeUserInfoArray(common.UserInfo[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeUserInfo(array[i]);
                }                
            }

            public void writeUserInfo334(common.UserInfo334 value){
                
                writeIntArray(value.ss);
            }
            public void writeUserInfo334Array(common.UserInfo334[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeUserInfo334(array[i]);
                }                
            }

            public void writeSSS(WWW.SSS value){
                
                writeInt(value.ss);

                writeString(value.cc);
            }
            public void writeSSSArray(WWW.SSS[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeSSS(array[i]);
                }                
            }

            public void writeFD_UserInfo_Aa2(common.FD_UserInfo_Aa2 value){
                
                writeInt(value.abc);

                writeInt(value.test);
            }
            public void writeFD_UserInfo_Aa2Array(common.FD_UserInfo_Aa2[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeFD_UserInfo_Aa2(array[i]);
                }                
            }

            public void writeFD_UserInfo_Sss(common.FD_UserInfo_Sss value){
                
                writeInt(value.sss);

                writeString(value.cbd);
            }
            public void writeFD_UserInfo_SssArray(common.FD_UserInfo_Sss[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeFD_UserInfo_Sss(array[i]);
                }                
            }

            public void writeMETHOD_ARG_getTime2(common.METHOD_ARG_getTime2 value){
                
                writeInt(value.www);
            }
            public void writeMETHOD_ARG_getTime2Array(common.METHOD_ARG_getTime2[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeMETHOD_ARG_getTime2(array[i]);
                }                
            }

            public void writeMETHOD_RET_getTime2(common.METHOD_RET_getTime2 value){
                
                writeString(value.sss);
            }
            public void writeMETHOD_RET_getTime2Array(common.METHOD_RET_getTime2[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeMETHOD_RET_getTime2(array[i]);
                }                
            }

            public void writeMETHOD_RET_getAAAAAAAAAa(aaaaaaaaaa.METHOD_RET_getAAAAAAAAAa value){
                
                writeInt(value.abc);

                writeString(value.sss);
            }
            public void writeMETHOD_RET_getAAAAAAAAAaArray(aaaaaaaaaa.METHOD_RET_getAAAAAAAAAa[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeMETHOD_RET_getAAAAAAAAAa(array[i]);
                }                
            }

            public void writeMETHOD_ARG_getTime3(aaaaaaaaaa.METHOD_ARG_getTime3 value){
                
                writeInt(value.name);

                writeStringArray(value.sss);
            }
            public void writeMETHOD_ARG_getTime3Array(aaaaaaaaaa.METHOD_ARG_getTime3[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeMETHOD_ARG_getTime3(array[i]);
                }                
            }

            public void writeMETHOD_RET_getTime3(aaaaaaaaaa.METHOD_RET_getTime3 value){
                
                writeInt(value.abc);

                writeString(value.sss);
            }
            public void writeMETHOD_RET_getTime3Array(aaaaaaaaaa.METHOD_RET_getTime3[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeMETHOD_RET_getTime3(array[i]);
                }                
            }

            public void writeMETHOD_ARG_fillPlayers(aaaaaaaaaa.METHOD_ARG_fillPlayers value){
                
                writeInt(value.name);

                writeStringArray(value.sss);
            }
            public void writeMETHOD_ARG_fillPlayersArray(aaaaaaaaaa.METHOD_ARG_fillPlayers[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeMETHOD_ARG_fillPlayers(array[i]);
                }                
            }

            public void writeMETHOD_RET_fillPlayers(aaaaaaaaaa.METHOD_RET_fillPlayers value){
                
                writeInt(value.abc);

                writeString(value.sss);
            }
            public void writeMETHOD_RET_fillPlayersArray(aaaaaaaaaa.METHOD_RET_fillPlayers[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeMETHOD_RET_fillPlayers(array[i]);
                }                
            }
        }