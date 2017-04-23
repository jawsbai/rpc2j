
        package common;
        public class UserInfo {
            
            public final String aa;

            public final boolean[] name;

            public final common.FD_UserInfo_Aa2 aa2;

            public final common.FD_UserInfo_Sss[] sss;

            public UserInfo(){
                
                this.aa="";

                this.name=new boolean[]{};

                this.aa2=new common.FD_UserInfo_Aa2();

                this.sss=new common.FD_UserInfo_Sss[]{};
            }

            public UserInfo(String aa, boolean[] name, common.FD_UserInfo_Aa2 aa2, common.FD_UserInfo_Sss[] sss){
                
                this.aa=aa;

                this.name=name;

                this.aa2=aa2;

                this.sss=sss;
            }
        }