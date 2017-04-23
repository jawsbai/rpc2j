
        package rpc2j;
        public class EndRemote {
            public EndRemote() {
            }
        
            protected int _newMessageID() {
                return 0;
            }
        
            protected void _sendMessage(TypeWriter writer, Message message) {
            }
            
            protected void _handle(TypeReader reader, Message message){
            }
        }