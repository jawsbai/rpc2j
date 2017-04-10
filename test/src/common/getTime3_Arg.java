
        package common;
        public class getTime3_Arg {
            
            public final int name;

            public final String sss;

            public getTime3_Arg(){
                
                this.name=0;

                this.sss="";
            }

            public getTime3_Arg(int name,String sss){
                
                this.name=name;

                this.sss=sss;
            }

            public static getTime3_Arg newEmpty(){
                return new getTime3_Arg();
            }

            public static getTime3_Arg create(int name,String sss){
                return new getTime3_Arg(name,sss);
            }
        }