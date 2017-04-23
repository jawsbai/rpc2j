
        package rpc2j;
        public class Receiver {
            private final EndRemote _remote;
            private final EndLocal _local;
            public Receiver(EndRemote remote, EndLocal local) {
                _remote=remote;
                _local=local;
            }
            
            public void receive(byte[] bytes){
                TypeReader reader=new TypeReader(bytes);
                Message message=Message.read(reader);
                if(message.type==1 || message.type==3){
                    _remote._handle(reader, message);
                }else if(message.type==2){
                    _local._handle(reader, message);
                }
            }
        }