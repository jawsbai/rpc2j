
        package common;
        public class EndLocal extends rpc2j.EndLocal{
            public EndLocal(){
            }
            
            protected void _handle(rpc2j.TypeReader reader, rpc2j.Message message){
                
                    if(message.methodID==0){
                        this.getSSS(reader.readUserInfoArray());
                    }
                else
                    if(message.methodID==1){
                        this.getTime1()
                            // .then(ret=>{
                                rpc2j.TypeWriter writer=new rpc2j.TypeWriter();
                                rpc2j.Message message2=rpc2j.Message.newResponse(this._newMessageID(), message.messageID);
                                rpc2j.Message.write(writer, message2);
                                writer.writeIntArray(ret);
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
                else
                    if(message.methodID==2){
                        this.getTime4(reader.readUserInfoArray())
                            // .then(ret=>{
                                rpc2j.TypeWriter writer=new rpc2j.TypeWriter();
                                rpc2j.Message message2=rpc2j.Message.newResponse(this._newMessageID(), message.messageID);
                                rpc2j.Message.write(writer, message2);
                                writer.writeUserInfoArray(ret);
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
                else
                    if(message.methodID==3){
                        this.getTime2(reader.readMETHOD_ARG_getTime2Array())
                            // .then(ret=>{
                                rpc2j.TypeWriter writer=new rpc2j.TypeWriter();
                                rpc2j.Message message2=rpc2j.Message.newResponse(this._newMessageID(), message.messageID);
                                rpc2j.Message.write(writer, message2);
                                writer.writeMETHOD_RET_getTime2(ret);
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
            
            
                protected void getSSS(common.UserInfo[] value){
                }
            

                protected void getTime1(){
                }
            

                protected void getTime4(common.UserInfo[] value){
                }
            

                protected void getTime2(common.METHOD_ARG_getTime2[] value){
                }
            
        }