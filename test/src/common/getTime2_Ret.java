
        package common;
        public class getTime2_Ret {
            
            public final String sss;

            public getTime2_Ret(){
                
                this.sss="";
            }

            public getTime2_Ret(String sss){
                
                this.sss=sss;
            }

            public static getTime2_Ret newEmpty(){
                return new getTime2_Ret();
            }

            public static getTime2_Ret create(String sss){
                return new getTime2_Ret(sss);
            }
        }