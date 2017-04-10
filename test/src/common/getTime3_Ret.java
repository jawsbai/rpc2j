
        package common;
        public class getTime3_Ret {
            
            public final int abc;

            public final String sss;

            public getTime3_Ret(){
                
                this.abc=0;

                this.sss="";
            }

            public getTime3_Ret(int abc,String sss){
                
                this.abc=abc;

                this.sss=sss;
            }

            public static getTime3_Ret newEmpty(){
                return new getTime3_Ret();
            }

            public static getTime3_Ret create(int abc,String sss){
                return new getTime3_Ret(abc,sss);
            }
        }