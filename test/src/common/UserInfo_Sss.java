
        package common;
        public class UserInfo_Sss {
            
            public final int sss;

            public final String cbd;

            public UserInfo_Sss(){
                
                this.sss=0;

                this.cbd="";
            }

            public UserInfo_Sss(int sss,String cbd){
                
                this.sss=sss;

                this.cbd=cbd;
            }

            public static UserInfo_Sss newEmpty(){
                return new UserInfo_Sss();
            }

            public static UserInfo_Sss create(int sss,String cbd){
                return new UserInfo_Sss(sss,cbd);
            }
        }