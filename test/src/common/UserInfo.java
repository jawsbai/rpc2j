
        package common;
        public class UserInfo {
            
            public final String aa;

            public final Boolean name;

            public final common.UserInfo_Aa2 aa2;

            public final common.UserInfo_Sss sss;

            public UserInfo(){
                
                this.aa="";

                this.name=false;

                this.aa2=common.UserInfo_Aa2.newEmpty();

                this.sss=common.UserInfo_Sss.newEmpty();
            }

            public UserInfo(String aa,Boolean name,common.UserInfo_Aa2 aa2,common.UserInfo_Sss sss){
                
                this.aa=aa;

                this.name=name;

                this.aa2=aa2;

                this.sss=sss;
            }

            public static UserInfo newEmpty(){
                return new UserInfo();
            }

            public static UserInfo create(String aa,Boolean name,common.UserInfo_Aa2 aa2,common.UserInfo_Sss sss){
                return new UserInfo(aa,name,aa2,sss);
            }
        }