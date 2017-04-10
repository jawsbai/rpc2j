
        package common;
        public class UserInfo334 {
            
            public final int ss;

            public UserInfo334(){
                
                this.ss=0;
            }

            public UserInfo334(int ss){
                
                this.ss=ss;
            }

            public static UserInfo334 newEmpty(){
                return new UserInfo334();
            }

            public static UserInfo334 create(int ss){
                return new UserInfo334(ss);
            }
        }