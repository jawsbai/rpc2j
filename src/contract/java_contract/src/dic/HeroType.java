
        package dic;
        import java.util.Objects;
        public class HeroType {
            public final String key;
            public final Object value;
        
            public HeroType(String key, Object value){
                this.key=key;
                this.value=value;
            }
            
            public int getInt(){
                if(value instanceof Integer){
                    return (int)value;
                }
                return 0;
            }
            
            public String getString(){
                if(value instanceof String){
                    return (String)value;
                }
                return "";
            }
            
            public Boolean getBoolean(){
                if(value instanceof Boolean){
                    return (Boolean)value;
                }
                return false;
            }
            
            public static final HeroType AAA=new HeroType("aaa", 111);
public static final HeroType BBB=new HeroType("bbb", 111);
public static final HeroType DDD=new HeroType("ddd", "llllllll");
public static final HeroType SSS=new HeroType("sss", "[2,3,4,5]");
public static final HeroType SS=new HeroType("ss", true);
public static final HeroType SS=new HeroType("SS", 111);
            
            private static final HeroType[] items=new HeroType[]{
                AAA,BBB,DDD,SSS,SS,SS
            };
            
            public static HeroType[] getItems(){
                int len=items.length;
                HeroType[] newItems=new HeroType[len];
                System.arraycopy(items,0,newItems,0,len);
                return newItems;
            }
            
            public static HeroType getByKey(String key) {
                for (HeroType item : items) {
                    if (Objects.equals(item.key, key)) {
                        return item;
                    }
                }
                return null;
            }
            
            public static HeroType getByValue(Object value) {
                for (HeroType item : items) {
                    if (Objects.equals(item.value, value)) {
                        return item;
                    }
                }
                return null;
            }
        }