
        package WWW;
        public class SSS {
            
            public final int ss;

            public final String cc;

            public SSS(){
                
                this.ss=0;

                this.cc="";
            }

            public SSS(int ss,String cc){
                
                this.ss=ss;

                this.cc=cc;
            }

            public static SSS newEmpty(){
                return new SSS();
            }

            public static SSS create(int ss,String cc){
                return new SSS(ss,cc);
            }
        }