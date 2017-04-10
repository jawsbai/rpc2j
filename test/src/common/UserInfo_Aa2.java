
        package common;
        public class UserInfo_Aa2 {
            
            public final int abc;

            public final int test;

            public UserInfo_Aa2(){
                
                this.abc=0;

                this.test=0;
            }

            public UserInfo_Aa2(int abc,int test){
                
                this.abc=abc;

                this.test=test;
            }

            public static UserInfo_Aa2 newEmpty(){
                return new UserInfo_Aa2();
            }

            public static UserInfo_Aa2 create(int abc,int test){
                return new UserInfo_Aa2(abc,test);
            }
        }