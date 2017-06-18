
        package dic;
        import java.util.Objects;
        public class Str {
            public final String key;
            public final Object value;
        
            public Str(String key, Object value){
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
            
            public static final Str ZH_SSSS=new Str("zh_ssss", "我我我我玩 生三世");
public static final Str BBB=new Str("bbb", "haahahahah");
public static final Str SS=new Str("ss", true);
public static final Str DDD=new Str("ddd", 2222);
public static final Str SS=new Str("SS", "ssssss");
            
            private static final Str[] items=new Str[]{
                ZH_SSSS,BBB,SS,DDD,SS
            };
            
            public static Str[] getItems(){
                int len=items.length;
                Str[] newItems=new Str[len];
                System.arraycopy(items,0,newItems,0,len);
                return newItems;
            }
            
            public static Str getByKey(String key) {
                for (Str item : items) {
                    if (Objects.equals(item.key, key)) {
                        return item;
                    }
                }
                return null;
            }
            
            public static Str getByValue(Object value) {
                for (Str item : items) {
                    if (Objects.equals(item.value, value)) {
                        return item;
                    }
                }
                return null;
            }
        }