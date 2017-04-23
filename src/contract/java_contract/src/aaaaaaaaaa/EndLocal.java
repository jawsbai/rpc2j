
        package aaaaaaaaaa;
        public class EndLocal extends rpc2j.EndLocal{
            public EndLocal(){
            }
            
            protected void _handle(rpc2j.TypeReader reader, rpc2j.Message message){
                
                    if(message.methodID==0){
                        this.getAAAAAAAAAa(reader.readInt())
                            // .then(ret=>{
                                rpc2j.TypeWriter writer=new rpc2j.TypeWriter();
                                rpc2j.Message message2=rpc2j.Message.newResponse(this._newMessageID(), message.messageID);
                                rpc2j.Message.write(writer, message2);
                                writer.writeMETHOD_RET_getAAAAAAAAAa(ret);
                                this._sendMessage(writer, message2);
                            // })
                            // .catch(error=>{
                                rpc2j.TypeWriter writer=new rpc2j.TypeWriter();
                                rpc2j.Message message2=rpc2j.Message.newResponseError(this._newMessageID(), message.messageID);
                                rpc2j.Message.write(writer, message2);
                                writer.writeString(error.toString());
                                this._sendMessage(writer, message2);                                
                            // });
                    }
                
            }
            
            
                protected void getAAAAAAAAAa(int value){
                }
            
        }