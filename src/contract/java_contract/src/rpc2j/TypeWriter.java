
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

                writeUserInfo_Aa2(value.aa2);

                writeUserInfo_SssArray(value.sss);
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

            public void writeUserInfo_Aa2(common.UserInfo_Aa2 value){
                
                writeInt(value.abc);

                writeInt(value.test);
            }
            public void writeUserInfo_Aa2Array(common.UserInfo_Aa2[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeUserInfo_Aa2(array[i]);
                }                
            }

            public void writeUserInfo_Sss(common.UserInfo_Sss value){
                
                writeInt(value.sss);

                writeString(value.cbd);
            }
            public void writeUserInfo_SssArray(common.UserInfo_Sss[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeUserInfo_Sss(array[i]);
                }                
            }

            public void writeGetTime2_Arg(common.getTime2_Arg value){
                
                writeInt(value.www);
            }
            public void writeGetTime2_ArgArray(common.getTime2_Arg[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeGetTime2_Arg(array[i]);
                }                
            }

            public void writeGetTime2_Ret(common.getTime2_Ret value){
                
                writeString(value.sss);
            }
            public void writeGetTime2_RetArray(common.getTime2_Ret[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeGetTime2_Ret(array[i]);
                }                
            }

            public void writeGetTime3_Arg(common.getTime3_Arg value){
                
                writeInt(value.name);

                writeStringArray(value.sss);
            }
            public void writeGetTime3_ArgArray(common.getTime3_Arg[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeGetTime3_Arg(array[i]);
                }                
            }

            public void writeGetTime3_Ret(common.getTime3_Ret value){
                
                writeInt(value.abc);

                writeString(value.sss);
            }
            public void writeGetTime3_RetArray(common.getTime3_Ret[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    writeGetTime3_Ret(array[i]);
                }                
            }
        }