
        package common;
        public class getTime2_Arg {
            
            public final int www;

            public getTime2_Arg(){
                
                this.www=0;
            }

            public getTime2_Arg(int www){
                
                this.www=www;
            }

            public static getTime2_Arg newEmpty(){
                return new getTime2_Arg();
            }

            public static getTime2_Arg create(int www){
                return new getTime2_Arg(www);
            }
        }