
        package rpc2j;
        import java.util.Date;
        public class Message{
            public final int type;
            public final int messageID;
            public final Date time;
            public final int methodID;
        
            public Message(int type, int messageID, Date time, int methodID){
                this.type=type;
                this.messageID=messageID;
                this.time=time;
                this.methodID=methodID;
            }
            
            public static Message read(TypeReader reader){
                return new Message(
                    reader.readByte(),
                    reader.readInt(),
                    reader.readDate(),
                    reader.readInt()
                );
            }
            
            public static void write(TypeWriter writer, Message message){
                writer.writeByte((byte)message.type);
                writer.writeInt(message.messageID);
                writer.writeDate(message.time);
                writer.writeInt(message.methodID);
            }
                
            public static Message newRequest(int messageID, int methodID){
                return new Message(1, messageID, new Date(), methodID);
            }
            
            public static Message newResponse(int messageID, int responseID){
                return new Message(2, messageID, new Date(), responseID);
            }
            
            public static Message newResponseError(int messageID, int responseID){
                return new Message(3, messageID, new Date(), responseID);
            }
        }