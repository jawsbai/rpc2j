
        package aaaaaaaaaa;
        public class EndRemote extends rpc2j.EndRemote{
            public EndRemote(){
            }
            
            
                public void getTime3(aaaaaaaaaa.METHOD_ARG_getTime3[] value){
                    rpc2j.TypeWriter writer=new rpc2j.TypeWriter();
                    rpc2j.Message message=rpc2j.Message.newRequest(this._newMessageID(), 0);
                    rpc2j.Message.write(writer, message);
                    writer.writeMETHOD_ARG_getTime3Array(value);
                    return this._sendMessage(writer, message)
                        .then((r, m)=>{
                            return r.readMETHOD_RET_getTime3();
                        });
                }
            

                public void fillPlayers(aaaaaaaaaa.METHOD_ARG_fillPlayers[] value){
                    rpc2j.TypeWriter writer=new rpc2j.TypeWriter();
                    rpc2j.Message message=rpc2j.Message.newRequest(this._newMessageID(), 1);
                    rpc2j.Message.write(writer, message);
                    writer.writeMETHOD_ARG_fillPlayersArray(value);
                    return this._sendMessage(writer, message)
                        .then((r, m)=>{
                            return r.readMETHOD_RET_fillPlayers();
                        });
                }
            

                public void FFFFFK(){
                    rpc2j.TypeWriter writer=new rpc2j.TypeWriter();
                    rpc2j.Message message=rpc2j.Message.newRequest(this._newMessageID(), 2);
                    rpc2j.Message.write(writer, message);
                    
                    return this._sendMessage(writer, message);
                }
            
        }