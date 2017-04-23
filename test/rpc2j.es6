
        import Q from 'q';
        


        export class Message{
            constructor(type, messageID,time, methodID){
                this._type=type;
                this._messageID=messageID;
                this._time=time;
                this._methodID=methodID;
            }
            
            get type(){return this._type;}
            get messageID(){return this._messageID;}
            get time(){return this._time;}
            get methodID(){return this._methodID;}
            
            static read(reader){
                return new Message(
                    reader.readByte(),
                    reader.readInt(),
                    reader.readDate(),
                    reader.methodID()
                )
            }
            
            static write(writer){
                writer.writeByte(this._type);
                writer.writeInt(this._messageID);
                writer.writeDate(this._time);
                writer.writeInt(this._methodID);
            }
                
            static newRequest(messageID, methodID){
                return new Message(1, messageID, new Date(), methodID);
            }
            
            static newResponse(messageID, responseID){
                return new Message(2, messageID, new Date(), responseID);
            }
            
            static newResponseError(messageID, responseID){
                return new Message(3, messageID, new Date(), responseID);
            }
        }


        export class Receiver {
            constructor(remote, local) {
                this._remote=remote;
                this._local=local;
            }
            
            receive(bytes){
                var reader=new TypeReader(bytes);
                var message=Message.read(reader);
                if(message.type==1 || message.type==3){
                    this._remote._handle(reader, message);
                }else if(message.type==2){
                    this._local._handle(reader, message);
                }
            }
        }


        export class EndRemote {
            constructor() {
            }
        
            _newMessageID() {
                return 0;
            }
        
            _sendMessage(writer, message) {
            }
            
            _handle(reader, message){
            }
        }


        export class EndLocal {
            constructor() {
        
            }
        
            _newMessageID() {
                return 0;
            }
        
            _sendMessage(writer, message) {
            }
            
            
            _handle(reader, message){
            }
        }


        export class common_EndRemote extends EndRemote{
            constructor(){
                super();
            }
            
            
                /**
                *
                * @param {[common_UserInfo]} value
                
                */
                getSSS(value){
                    var writer=new TypeWriter();
                    var message=Message.newRequest(this._newMessageID(), 0);
                    message.write(writer);
                    writer.writeUserInfoArray(value);
                    return this._sendMessage(writer, message);
                }
            

                /**
                *
                
                * @return {q<[int]>}
                */
                getTime1(){
                    var writer=new TypeWriter();
                    var message=Message.newRequest(this._newMessageID(), 1);
                    message.write(writer);
                    
                    return this._sendMessage(writer, message)
                        .then((r, m)=>{
                            return r.readIntArray();
                        });
                }
            

                /**
                *
                * @param {[common_UserInfo]} value
                * @return {q<[common_UserInfo]>}
                */
                getTime4(value){
                    var writer=new TypeWriter();
                    var message=Message.newRequest(this._newMessageID(), 2);
                    message.write(writer);
                    writer.writeUserInfoArray(value);
                    return this._sendMessage(writer, message)
                        .then((r, m)=>{
                            return r.readUserInfoArray();
                        });
                }
            

                /**
                *
                * @param {[common_METHOD_ARG_getTime2]} value
                * @return {q<common_METHOD_RET_getTime2>}
                */
                getTime2(value){
                    var writer=new TypeWriter();
                    var message=Message.newRequest(this._newMessageID(), 3);
                    message.write(writer);
                    writer.writeMETHOD_ARG_getTime2Array(value);
                    return this._sendMessage(writer, message)
                        .then((r, m)=>{
                            return r.readMETHOD_RET_getTime2();
                        });
                }
            
        }


        export class aaaaaaaaaa_EndRemote extends EndRemote{
            constructor(){
                super();
            }
            
            
                /**
                *
                * @param {int} value
                * @return {q<aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa>}
                */
                getAAAAAAAAAa(value){
                    var writer=new TypeWriter();
                    var message=Message.newRequest(this._newMessageID(), 0);
                    message.write(writer);
                    writer.writeInt(value);
                    return this._sendMessage(writer, message)
                        .then((r, m)=>{
                            return r.readMETHOD_RET_getAAAAAAAAAa();
                        });
                }
            
        }


        export class aaaaaaaaaa_EndLocal extends EndLocal{
            constructor(){
                super();
            }
            
            _handle(reader, message){
                
                    if(message.methodID==0){
                        this.getTime3(reader.readMETHOD_ARG_getTime3Array())
                            .then(ret=>{
                                var writer=new TypeWriter();
                                var message=Message.newResponse(this._newMessageID(), message.messageID);
                                message.write(writer);
                                writer.writeMETHOD_RET_getTime3(ret);
                                this._sendMessage(writer, message);
                            })
                            .catch(error=>{
                                var writer=new TypeWriter();
                                var message=Message.newResponseError(this._newMessageID(), messageID);
                                message.write(writer);
                                writer.writeString((error || '').toString());
                                this._sendMessage(writer);                                
                            });
                    }
                else
                    if(message.methodID==1){
                        this.fillPlayers(reader.readMETHOD_ARG_fillPlayersArray())
                            .then(ret=>{
                                var writer=new TypeWriter();
                                var message=Message.newResponse(this._newMessageID(), message.messageID);
                                message.write(writer);
                                writer.writeMETHOD_RET_fillPlayers(ret);
                                this._sendMessage(writer, message);
                            })
                            .catch(error=>{
                                var writer=new TypeWriter();
                                var message=Message.newResponseError(this._newMessageID(), messageID);
                                message.write(writer);
                                writer.writeString((error || '').toString());
                                this._sendMessage(writer);                                
                            });
                    }
                else
                    if(message.methodID==2){
                        this.FFFFFK();
                    }
                
            }
            
            
                /**
                *
                * @param {[aaaaaaaaaa_METHOD_ARG_getTime3]} value
                * @return {q<aaaaaaaaaa_METHOD_RET_getTime3>}
                */
                getTime3(value){
                }
            

                /**
                *
                * @param {[aaaaaaaaaa_METHOD_ARG_fillPlayers]} value
                * @return {q<aaaaaaaaaa_METHOD_RET_fillPlayers>}
                */
                fillPlayers(value){
                }
            

                /**
                *
                
                
                */
                FFFFFK(){
                }
            
        }

export class ByteArrayReader {
    /**
     *
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        this._bytes = bytes;
        this._position = 0;
    }

    /**
     *
     * @return {boolean}
     */
    readBoolean() {
        return this.readByte() == 1;
    }

    /**
     *
     * @return {number}
     */
    readByte() {
        var b = this._bytes[this._position];
        this._position++;
        return b;
    }

    /**
     *
     * @return {number}
     */
    readShort() {
        var ch1 = this.readByte();
        var ch2 = this.readByte();
        return (ch1 << 8) + ch2;
    }

    /**
     *
     * @return {int}
     */
    readInt() {
        var ch1 = this.readByte();
        var ch2 = this.readByte();
        var ch3 = this.readByte();
        var ch4 = this.readByte();
        return (ch1 << 24) + (ch2 << 16) + (ch3 << 8) + ch4;
    }

    /**
     *
     * @return {number}
     */
    readFloat() {
        return parseFloat(this.readString());
    }

    /**
     *
     * @return {Date}
     */
    readDate() {
        return new Date(parseInt(this.readString()));
    }

    /**
     *
     * @return {String}
     */
    readString() {
        var len = this.readInt();
        var ss = [];
        for (var i = 0; i < len; i++) {
            ss.push(String.fromCharCode(this.readInt()));
        }
        return ss.join('');
    }
}

const MAX_LEN = 3;

function Node() {
    return {
        data: new Uint8Array(MAX_LEN),
        next: null,
        index: 0,
        position: 0
    }
}

export class ByteArrayWriter {
    constructor() {
        this._current = Node();
        this._begin = this._current;
    }

    /**
     *
     * @private
     */
    _arraycopy(src, srcPos, dest, destPos, length) {
        for (var si = srcPos, di = destPos, len = destPos + length;
             di < len;
             si++, di++) {
            dest[di] = src[si];
        }
    }

    /**
     *
     * @return {number}
     */
    get length() {
        return this._current.index * MAX_LEN + this._current.position;
    }

    /**
     *
     * @return {Uint8Array}
     */
    toArray() {
        var bytes = new Uint8Array(this.length);
        var node = this._begin;
        while (node != null) {
            this._arraycopy(node.data, 0, bytes, node.index * MAX_LEN, node.position);
            // console.log(node.index, node.position);
            node = node.next;
        }
        return bytes;
    }

    /**
     *
     * @param {boolean} value
     */
    writeBoolean(value) {
        this.writeByte(value ? 1 : 0);
    }

    /**
     *
     * @param {number} value
     */
    writeByte(value) {
        this._current.data[this._current.position] = value;
        this._current.position++;

        if (this._current.position == MAX_LEN) {
            var current = Node();
            current.index = this._current.index + 1;
            this._current.next = current;
            this._current = current;
        }
    }

    /**
     *
     * @param {number} value
     */
    writeShort(value) {
        this.writeByte((value >>> 8) & 0xFF);
        this.writeByte((value) & 0xFF);
    }

    /**
     *
     * @param {number} value
     */
    writeInt(value) {
        this.writeByte((value >>> 24) & 0xFF);
        this.writeByte((value >>> 16) & 0xFF);
        this.writeByte((value >>> 8) & 0xFF);
        this.writeByte((value) & 0xFF);
    }

    /**
     *
     * @param {number} value
     */
    writeFloat(value) {
        this.writeString(value.toString());
    }

    /**
     *
     * @param {Date} value
     */
    writeDate(value) {
        this.writeString(value.getTime().toString());
    }

    /**
     *
     * @param {string} value
     */
    writeString(value) {
        var len = value.length;
        this.writeInt(len);
        for (var i = 0; i < len; i++) {
            this.writeInt(value.charCodeAt(i));
        }
    }
}


        export class TypeReader extends ByteArrayReader {
            /**
             *
             * @param {Uint8Array} bytes
             */
            constructor(bytes){
                super(bytes);
            }
            
            
            /**
             *
             * @return {[boolean]}
             */
             readBooleanArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readBoolean();
                }
                return array;
            }

            /**
             *
             * @return {[byte]}
             */
             readByteArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readByte();
                }
                return array;
            }

            /**
             *
             * @return {[short]}
             */
             readShortArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readShort();
                }
                return array;
            }

            /**
             *
             * @return {[int]}
             */
             readIntArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readInt();
                }
                return array;
            }

            /**
             *
             * @return {[Date]}
             */
             readDateArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readDate();
                }
                return array;
            }

            /**
             *
             * @return {[string]}
             */
             readStringArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readString();
                }
                return array;
            }
            
            
            /**
             *
             * @return {a_ABS}
             */
            readABS(){
                return new a_ABS(
                
                this.readIntArray()
                );
            }
            /**
             *
             * @return {[a_ABS]}
             */
            readABSArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readABS();
                }
                return array;
            }

            /**
             *
             * @return {common_UserInfo}
             */
            readUserInfo(){
                return new common_UserInfo(
                
                this.readString(),
                this.readBooleanArray(),
                this.readFD_UserInfo_Aa2(),
                this.readFD_UserInfo_SssArray()
                );
            }
            /**
             *
             * @return {[common_UserInfo]}
             */
            readUserInfoArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readUserInfo();
                }
                return array;
            }

            /**
             *
             * @return {common_UserInfo334}
             */
            readUserInfo334(){
                return new common_UserInfo334(
                
                this.readIntArray()
                );
            }
            /**
             *
             * @return {[common_UserInfo334]}
             */
            readUserInfo334Array(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readUserInfo334();
                }
                return array;
            }

            /**
             *
             * @return {WWW_SSS}
             */
            readSSS(){
                return new WWW_SSS(
                
                this.readInt(),
                this.readString()
                );
            }
            /**
             *
             * @return {[WWW_SSS]}
             */
            readSSSArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readSSS();
                }
                return array;
            }

            /**
             *
             * @return {common_FD_UserInfo_Aa2}
             */
            readFD_UserInfo_Aa2(){
                return new common_FD_UserInfo_Aa2(
                
                this.readInt(),
                this.readInt()
                );
            }
            /**
             *
             * @return {[common_FD_UserInfo_Aa2]}
             */
            readFD_UserInfo_Aa2Array(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readFD_UserInfo_Aa2();
                }
                return array;
            }

            /**
             *
             * @return {common_FD_UserInfo_Sss}
             */
            readFD_UserInfo_Sss(){
                return new common_FD_UserInfo_Sss(
                
                this.readInt(),
                this.readString()
                );
            }
            /**
             *
             * @return {[common_FD_UserInfo_Sss]}
             */
            readFD_UserInfo_SssArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readFD_UserInfo_Sss();
                }
                return array;
            }

            /**
             *
             * @return {common_METHOD_ARG_getTime2}
             */
            readMETHOD_ARG_getTime2(){
                return new common_METHOD_ARG_getTime2(
                
                this.readInt()
                );
            }
            /**
             *
             * @return {[common_METHOD_ARG_getTime2]}
             */
            readMETHOD_ARG_getTime2Array(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readMETHOD_ARG_getTime2();
                }
                return array;
            }

            /**
             *
             * @return {common_METHOD_RET_getTime2}
             */
            readMETHOD_RET_getTime2(){
                return new common_METHOD_RET_getTime2(
                
                this.readString()
                );
            }
            /**
             *
             * @return {[common_METHOD_RET_getTime2]}
             */
            readMETHOD_RET_getTime2Array(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readMETHOD_RET_getTime2();
                }
                return array;
            }

            /**
             *
             * @return {aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa}
             */
            readMETHOD_RET_getAAAAAAAAAa(){
                return new aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa(
                
                this.readInt(),
                this.readString()
                );
            }
            /**
             *
             * @return {[aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa]}
             */
            readMETHOD_RET_getAAAAAAAAAaArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readMETHOD_RET_getAAAAAAAAAa();
                }
                return array;
            }

            /**
             *
             * @return {aaaaaaaaaa_METHOD_ARG_getTime3}
             */
            readMETHOD_ARG_getTime3(){
                return new aaaaaaaaaa_METHOD_ARG_getTime3(
                
                this.readInt(),
                this.readStringArray()
                );
            }
            /**
             *
             * @return {[aaaaaaaaaa_METHOD_ARG_getTime3]}
             */
            readMETHOD_ARG_getTime3Array(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readMETHOD_ARG_getTime3();
                }
                return array;
            }

            /**
             *
             * @return {aaaaaaaaaa_METHOD_RET_getTime3}
             */
            readMETHOD_RET_getTime3(){
                return new aaaaaaaaaa_METHOD_RET_getTime3(
                
                this.readInt(),
                this.readString()
                );
            }
            /**
             *
             * @return {[aaaaaaaaaa_METHOD_RET_getTime3]}
             */
            readMETHOD_RET_getTime3Array(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readMETHOD_RET_getTime3();
                }
                return array;
            }

            /**
             *
             * @return {aaaaaaaaaa_METHOD_ARG_fillPlayers}
             */
            readMETHOD_ARG_fillPlayers(){
                return new aaaaaaaaaa_METHOD_ARG_fillPlayers(
                
                this.readInt(),
                this.readStringArray()
                );
            }
            /**
             *
             * @return {[aaaaaaaaaa_METHOD_ARG_fillPlayers]}
             */
            readMETHOD_ARG_fillPlayersArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readMETHOD_ARG_fillPlayers();
                }
                return array;
            }

            /**
             *
             * @return {aaaaaaaaaa_METHOD_RET_fillPlayers}
             */
            readMETHOD_RET_fillPlayers(){
                return new aaaaaaaaaa_METHOD_RET_fillPlayers(
                
                this.readInt(),
                this.readString()
                );
            }
            /**
             *
             * @return {[aaaaaaaaaa_METHOD_RET_fillPlayers]}
             */
            readMETHOD_RET_fillPlayersArray(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.readMETHOD_RET_fillPlayers();
                }
                return array;
            }
        }


        export class TypeWriter extends ByteArrayWriter {
            
            
            /**
             *
             * @param {[boolean]} array
             */
            writeBooleanArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeBoolean(array[i]);
                }
            }

            /**
             *
             * @param {[byte]} array
             */
            writeByteArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeByte(array[i]);
                }
            }

            /**
             *
             * @param {[short]} array
             */
            writeShortArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeShort(array[i]);
                }
            }

            /**
             *
             * @param {[int]} array
             */
            writeIntArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeInt(array[i]);
                }
            }

            /**
             *
             * @param {[Date]} array
             */
            writeDateArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeDate(array[i]);
                }
            }

            /**
             *
             * @param {[string]} array
             */
            writeStringArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeString(array[i]);
                }
            }
            
            
            /**
             *
             * @param {a_ABS} value
             */
            writeABS(value){
                
                this.writeIntArray(value.ddd);
                
            }
            /**
             *
             * @param {[a_ABS]} array
             */
            writeABSArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeABS(array[i]);
                }                
            }

            /**
             *
             * @param {common_UserInfo} value
             */
            writeUserInfo(value){
                
                this.writeString(value.aa);
                

                this.writeBooleanArray(value.name);
                

                this.writeFD_UserInfo_Aa2(value.aa2);
                

                this.writeFD_UserInfo_SssArray(value.sss);
                
            }
            /**
             *
             * @param {[common_UserInfo]} array
             */
            writeUserInfoArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeUserInfo(array[i]);
                }                
            }

            /**
             *
             * @param {common_UserInfo334} value
             */
            writeUserInfo334(value){
                
                this.writeIntArray(value.ss);
                
            }
            /**
             *
             * @param {[common_UserInfo334]} array
             */
            writeUserInfo334Array(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeUserInfo334(array[i]);
                }                
            }

            /**
             *
             * @param {WWW_SSS} value
             */
            writeSSS(value){
                
                this.writeInt(value.ss);
                

                this.writeString(value.cc);
                
            }
            /**
             *
             * @param {[WWW_SSS]} array
             */
            writeSSSArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeSSS(array[i]);
                }                
            }

            /**
             *
             * @param {common_FD_UserInfo_Aa2} value
             */
            writeFD_UserInfo_Aa2(value){
                
                this.writeInt(value.abc);
                

                this.writeInt(value.test);
                
            }
            /**
             *
             * @param {[common_FD_UserInfo_Aa2]} array
             */
            writeFD_UserInfo_Aa2Array(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeFD_UserInfo_Aa2(array[i]);
                }                
            }

            /**
             *
             * @param {common_FD_UserInfo_Sss} value
             */
            writeFD_UserInfo_Sss(value){
                
                this.writeInt(value.sss);
                

                this.writeString(value.cbd);
                
            }
            /**
             *
             * @param {[common_FD_UserInfo_Sss]} array
             */
            writeFD_UserInfo_SssArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeFD_UserInfo_Sss(array[i]);
                }                
            }

            /**
             *
             * @param {common_METHOD_ARG_getTime2} value
             */
            writeMETHOD_ARG_getTime2(value){
                
                this.writeInt(value.www);
                
            }
            /**
             *
             * @param {[common_METHOD_ARG_getTime2]} array
             */
            writeMETHOD_ARG_getTime2Array(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeMETHOD_ARG_getTime2(array[i]);
                }                
            }

            /**
             *
             * @param {common_METHOD_RET_getTime2} value
             */
            writeMETHOD_RET_getTime2(value){
                
                this.writeString(value.sss);
                
            }
            /**
             *
             * @param {[common_METHOD_RET_getTime2]} array
             */
            writeMETHOD_RET_getTime2Array(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeMETHOD_RET_getTime2(array[i]);
                }                
            }

            /**
             *
             * @param {aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa} value
             */
            writeMETHOD_RET_getAAAAAAAAAa(value){
                
                this.writeInt(value.abc);
                

                this.writeString(value.sss);
                
            }
            /**
             *
             * @param {[aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa]} array
             */
            writeMETHOD_RET_getAAAAAAAAAaArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeMETHOD_RET_getAAAAAAAAAa(array[i]);
                }                
            }

            /**
             *
             * @param {aaaaaaaaaa_METHOD_ARG_getTime3} value
             */
            writeMETHOD_ARG_getTime3(value){
                
                this.writeInt(value.name);
                

                this.writeStringArray(value.sss);
                
            }
            /**
             *
             * @param {[aaaaaaaaaa_METHOD_ARG_getTime3]} array
             */
            writeMETHOD_ARG_getTime3Array(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeMETHOD_ARG_getTime3(array[i]);
                }                
            }

            /**
             *
             * @param {aaaaaaaaaa_METHOD_RET_getTime3} value
             */
            writeMETHOD_RET_getTime3(value){
                
                this.writeInt(value.abc);
                

                this.writeString(value.sss);
                
            }
            /**
             *
             * @param {[aaaaaaaaaa_METHOD_RET_getTime3]} array
             */
            writeMETHOD_RET_getTime3Array(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeMETHOD_RET_getTime3(array[i]);
                }                
            }

            /**
             *
             * @param {aaaaaaaaaa_METHOD_ARG_fillPlayers} value
             */
            writeMETHOD_ARG_fillPlayers(value){
                
                this.writeInt(value.name);
                

                this.writeStringArray(value.sss);
                
            }
            /**
             *
             * @param {[aaaaaaaaaa_METHOD_ARG_fillPlayers]} array
             */
            writeMETHOD_ARG_fillPlayersArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeMETHOD_ARG_fillPlayers(array[i]);
                }                
            }

            /**
             *
             * @param {aaaaaaaaaa_METHOD_RET_fillPlayers} value
             */
            writeMETHOD_RET_fillPlayers(value){
                
                this.writeInt(value.abc);
                

                this.writeString(value.sss);
                
            }
            /**
             *
             * @param {[aaaaaaaaaa_METHOD_RET_fillPlayers]} array
             */
            writeMETHOD_RET_fillPlayersArray(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.writeMETHOD_RET_fillPlayers(array[i]);
                }                
            }
        }


         export class a_ABS{
            /**
            
             * @param {[int]} ddd
             */
            constructor(ddd){
                
                this.ddd=ddd;
            }
            
             /**
              * @return {a_ABS}
              */
            static empty(){
                return new a_ABS([]);
            }
        }


         export class common_UserInfo{
            /**
            
             * @param {string} aa,
             * @param {[boolean]} name,
             * @param {common_FD_UserInfo_Aa2} aa2,
             * @param {[common_FD_UserInfo_Sss]} sss
             */
            constructor(aa,name,aa2,sss){
                
                this.aa=aa;

                this.name=name;

                this.aa2=aa2;

                this.sss=sss;
            }
            
             /**
              * @return {common_UserInfo}
              */
            static empty(){
                return new common_UserInfo("", [], common_FD_UserInfo_Aa2.empty(), []);
            }
        }


         export class common_UserInfo334{
            /**
            
             * @param {[int]} ss
             */
            constructor(ss){
                
                this.ss=ss;
            }
            
             /**
              * @return {common_UserInfo334}
              */
            static empty(){
                return new common_UserInfo334([]);
            }
        }


         export class WWW_SSS{
            /**
            
             * @param {int} ss,
             * @param {string} cc
             */
            constructor(ss,cc){
                
                this.ss=ss;

                this.cc=cc;
            }
            
             /**
              * @return {WWW_SSS}
              */
            static empty(){
                return new WWW_SSS(0, "");
            }
        }


         export class common_FD_UserInfo_Aa2{
            /**
            
             * @param {int} abc,
             * @param {int} test
             */
            constructor(abc,test){
                
                this.abc=abc;

                this.test=test;
            }
            
             /**
              * @return {common_FD_UserInfo_Aa2}
              */
            static empty(){
                return new common_FD_UserInfo_Aa2(0, 0);
            }
        }


         export class common_FD_UserInfo_Sss{
            /**
            
             * @param {int} sss,
             * @param {string} cbd
             */
            constructor(sss,cbd){
                
                this.sss=sss;

                this.cbd=cbd;
            }
            
             /**
              * @return {common_FD_UserInfo_Sss}
              */
            static empty(){
                return new common_FD_UserInfo_Sss(0, "");
            }
        }


         export class common_METHOD_ARG_getTime2{
            /**
            
             * @param {int} www
             */
            constructor(www){
                
                this.www=www;
            }
            
             /**
              * @return {common_METHOD_ARG_getTime2}
              */
            static empty(){
                return new common_METHOD_ARG_getTime2(0);
            }
        }


         export class common_METHOD_RET_getTime2{
            /**
            
             * @param {string} sss
             */
            constructor(sss){
                
                this.sss=sss;
            }
            
             /**
              * @return {common_METHOD_RET_getTime2}
              */
            static empty(){
                return new common_METHOD_RET_getTime2("");
            }
        }


         export class aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa{
            /**
            
             * @param {int} abc,
             * @param {string} sss
             */
            constructor(abc,sss){
                
                this.abc=abc;

                this.sss=sss;
            }
            
             /**
              * @return {aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa}
              */
            static empty(){
                return new aaaaaaaaaa_METHOD_RET_getAAAAAAAAAa(0, "");
            }
        }


         export class aaaaaaaaaa_METHOD_ARG_getTime3{
            /**
            
             * @param {int} name,
             * @param {[string]} sss
             */
            constructor(name,sss){
                
                this.name=name;

                this.sss=sss;
            }
            
             /**
              * @return {aaaaaaaaaa_METHOD_ARG_getTime3}
              */
            static empty(){
                return new aaaaaaaaaa_METHOD_ARG_getTime3(0, []);
            }
        }


         export class aaaaaaaaaa_METHOD_RET_getTime3{
            /**
            
             * @param {int} abc,
             * @param {string} sss
             */
            constructor(abc,sss){
                
                this.abc=abc;

                this.sss=sss;
            }
            
             /**
              * @return {aaaaaaaaaa_METHOD_RET_getTime3}
              */
            static empty(){
                return new aaaaaaaaaa_METHOD_RET_getTime3(0, "");
            }
        }


         export class aaaaaaaaaa_METHOD_ARG_fillPlayers{
            /**
            
             * @param {int} name,
             * @param {[string]} sss
             */
            constructor(name,sss){
                
                this.name=name;

                this.sss=sss;
            }
            
             /**
              * @return {aaaaaaaaaa_METHOD_ARG_fillPlayers}
              */
            static empty(){
                return new aaaaaaaaaa_METHOD_ARG_fillPlayers(0, []);
            }
        }


         export class aaaaaaaaaa_METHOD_RET_fillPlayers{
            /**
            
             * @param {int} abc,
             * @param {string} sss
             */
            constructor(abc,sss){
                
                this.abc=abc;

                this.sss=sss;
            }
            
             /**
              * @return {aaaaaaaaaa_METHOD_RET_fillPlayers}
              */
            static empty(){
                return new aaaaaaaaaa_METHOD_RET_fillPlayers(0, "");
            }
        }