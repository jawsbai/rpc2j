
        package a;
        public class ABS {
            
            public final int ddd;

            public ABS(){
                
                this.ddd=0;
            }

            public ABS(int ddd){
                
                this.ddd=ddd;
            }

            public static ABS newEmpty(){
                return new ABS();
            }

            public static ABS create(int ddd){
                return new ABS(ddd);
            }
        }