var Gen = require('./Gen.es6'),
    GEN = require('../GEN.es6'),
    odts = require('../odts.es6'),
    CodeFile = require('../CodeFile.es6'),
    P = require('path'),
    FileUtil = require('../../common/FileUtil.es6'),
    firstCharUpper = require('../firstCharUpper.es6');

class GenJAVA extends Gen {
    constructor(gen, nodeList) {
        super(gen, nodeList);
    }

    _makeTypes() {
        return this._nodeList.findTypes().map(typeNode=>this._makeType(typeNode));
    }

    _makeType(typeNode) {
        var typeName = typeNode.name;
        var codeFile = new CodeFile(typeNode.ns, typeName);

        var args = this.mapTypeFields(typeNode, (f, t)=> {
            return `${t.nameTypeExpr(this.lang)} ${f.name}`;
        });

        codeFile.append(`
        package ${typeNode.ns};
        public class ${typeName} {
            ${this.mapTypeFields(typeNode, (f, t)=>`
            public final ${t.nameTypeExpr(this.lang)} ${f.name};`).join('\n')}

            public ${typeName}(){
                ${this.mapTypeFields(typeNode, (f, t)=>`
                this.${f.name}=${t.getEmpty(this.lang)};`).join('\n')}
            }

            public ${typeName}(${args.join(', ')}){
                ${this.mapTypeFields(typeNode, (f, t)=>`
                this.${f.name}=${f.name};`).join('\n')}
            }
        }`);

        return codeFile;
    }

    _makeByteArrayReader() {
        var templete = P.join(P.dirname(__dirname), 'java_templete/src/com/ByteArrayReader.java');
        var code = FileUtil.readString(templete);

        code = code.replace('package com;', `package ${GEN.RPC2J};`);

        return new CodeFile(GEN.RPC2J, GEN.BYTE_ARRAY_READER).append(code);
    }

    _makeByteArrayWriter() {
        var templete = P.join(P.dirname(__dirname), 'java_templete/src/com/ByteArrayWriter.java');
        var code = FileUtil.readString(templete);

        code = code.replace('package com;', `package ${GEN.RPC2J};`);

        return new CodeFile(GEN.RPC2J, GEN.BYTE_ARRAY_WRITER).append(code);
    }

    _makeTypeReader() {
        return new CodeFile(GEN.RPC2J, GEN.TYPE_READER).append(`
        package ${GEN.RPC2J};
        import java.util.Date;
        public class ${GEN.TYPE_READER} extends ${GEN.RPC2J}.${GEN.BYTE_ARRAY_READER} {
            public ${GEN.TYPE_READER}(byte[] bytes){
                super(bytes);
            }
            
            ${this.mapODTS((t, n)=>`
            public ${n}[] read${firstCharUpper(n)}Array(){
                int length=readInt();
                ${n}[] array=new ${n}[length];
                for(int i=0;i<length;i++){
                    array[i]=read${firstCharUpper(n)}();
                }
                return array;
            }`).join('\n')}
            
            ${this.mapTypes((t, ns, n)=>`
            public ${ns}.${n} read${firstCharUpper(n)}(){
                return new ${ns}.${n}(
                ${this.mapTypeFields(t, (f, t2)=>`
                ${t2.getRead(this.lang)}()`).join(',')}
                );
            }
            public ${ns}.${n}[] read${firstCharUpper(n)}Array(){
                int length=readInt();
                ${ns}.${n}[] array=new ${ns}.${n}[length];
                for(int i=0;i<length;i++){
                    array[i]=read${firstCharUpper(n)}();
                }
                return array;
            }`).join('\n')}
        }`);
    }

    _makeTypeWriter() {
        return new CodeFile(GEN.RPC2J, GEN.TYPE_WRITER).append(`
        package ${GEN.RPC2J};
        import java.util.Date;
        public class ${GEN.TYPE_WRITER} extends ${GEN.RPC2J}.${GEN.BYTE_ARRAY_WRITER} {
            
            ${this.mapODTS((t, n)=>`
            public void write${firstCharUpper(n)}Array(${n}[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    write${firstCharUpper(n)}(array[i]);
                }
            }`).join('\n')}
            
            ${this.mapTypes((t, ns, n)=>`
            public void write${firstCharUpper(n)}(${ns}.${n} value){
                ${this.mapTypeFields(t, (f, t2)=>`
                ${t2.getWrite(this.lang)}(value.${f.name});`).join('\n')}
            }
            public void write${firstCharUpper(n)}Array(${ns}.${n}[] array){
                int length=array.length;
                writeInt(length);
                for(int i=0;i<length;i++){
                    write${firstCharUpper(n)}(array[i]);
                }                
            }`).join('\n')}
        }`);
    }

    _makeMessage() {
        return new CodeFile(GEN.RPC2J, GEN.MESSAGE).append(`
        package ${GEN.RPC2J};
        import java.util.Date;
        public class ${GEN.MESSAGE}{
            public final int type;
            public final int messageID;
            public final Date time;
            public final int methodID;
        
            public ${GEN.MESSAGE}(int type, int messageID, Date time, int methodID){
                this.type=type;
                this.messageID=messageID;
                this.time=time;
                this.methodID=methodID;
            }
            
            public static ${GEN.MESSAGE} read(${GEN.TYPE_READER} reader){
                return new ${GEN.MESSAGE}(
                    reader.readByte(),
                    reader.readInt(),
                    reader.readDate(),
                    reader.readInt()
                );
            }
            
            public static void write(${GEN.TYPE_WRITER} writer, ${GEN.MESSAGE} message){
                writer.writeByte((byte)message.type);
                writer.writeInt(message.messageID);
                writer.writeDate(message.time);
                writer.writeInt(message.methodID);
            }
                
            public static ${GEN.MESSAGE} newRequest(int messageID, int methodID){
                return new ${GEN.MESSAGE}(1, messageID, new Date(), methodID);
            }
            
            public static ${GEN.MESSAGE} newResponse(int messageID, int responseID){
                return new ${GEN.MESSAGE}(2, messageID, new Date(), responseID);
            }
            
            public static ${GEN.MESSAGE} newResponseError(int messageID, int responseID){
                return new ${GEN.MESSAGE}(3, messageID, new Date(), responseID);
            }
        }`);
    }

    _makeReceiver() {
        return new CodeFile(GEN.RPC2J, GEN.RECEIVER).append(`
        package ${GEN.RPC2J};
        public class ${GEN.RECEIVER} {
            private final ${GEN.END_REMOTE} _remote;
            private final ${GEN.END_LOCAL} _local;
            public ${GEN.RECEIVER}(${GEN.END_REMOTE} remote, ${GEN.END_LOCAL} local) {
                _remote=remote;
                _local=local;
            }
            
            public void receive(byte[] bytes){
                ${GEN.TYPE_READER} reader=new ${GEN.TYPE_READER}(bytes);
                ${GEN.MESSAGE} message=${GEN.MESSAGE}.read(reader);
                if(message.type==1 || message.type==3){
                    _remote._handle(reader, message);
                }else if(message.type==2){
                    _local._handle(reader, message);
                }
            }
        }`);
    }

    _makeEndRemote() {
        return new CodeFile(GEN.RPC2J, GEN.END_REMOTE).append(`
        package ${GEN.RPC2J};
        public class ${GEN.END_REMOTE} {
            public ${GEN.END_REMOTE}() {
            }
        
            protected int _newMessageID() {
                return 0;
            }
        
            protected void _sendMessage(${GEN.TYPE_WRITER} writer, ${GEN.MESSAGE} message) {
            }
            
            protected void _handle(${GEN.TYPE_READER} reader, ${GEN.MESSAGE} message){
            }
        }`);
    }

    _makeEndLocal() {
        return new CodeFile(GEN.RPC2J, GEN.END_LOCAL).append(`
        package ${GEN.RPC2J};
        public class ${GEN.END_LOCAL} {
            public ${GEN.END_LOCAL}() {
        
            }
            
            protected int _newMessageID() {
                return 0;
            }
        
            protected void _sendMessage(${GEN.TYPE_WRITER} writer, ${GEN.MESSAGE} message) {
            }
            
            protected void _handle(${GEN.TYPE_READER} reader, ${GEN.MESSAGE} message){
            }
        }`);
    }

    _makeEndRemoteByNS(ns, methods) {
        return new CodeFile(ns, GEN.END_REMOTE).append(`
        package ${ns};
        public class ${GEN.END_REMOTE} extends ${GEN.RPC2J}.${GEN.END_REMOTE}{
            public ${GEN.END_REMOTE}(){
            }
            
            ${this.mapMethods(methods, (i, m, a, r, at, rt)=>`
                public void ${m.name}(${a ? `${at.nameTypeExpr(this.lang)} value` : ''}){
                    ${GEN.RPC2J}.${GEN.TYPE_WRITER} writer=new ${GEN.RPC2J}.${GEN.TYPE_WRITER}();
                    ${GEN.RPC2J}.${GEN.MESSAGE} message=${GEN.RPC2J}.${GEN.MESSAGE}.newRequest(this._newMessageID(), ${i});
                    ${GEN.RPC2J}.${GEN.MESSAGE}.write(writer, message);
                    ${a ? `writer.${at.getWrite(this.lang)}(value);` : ''}
                    return this._sendMessage(writer, message)${r ? `
                        .then((r, m)=>{
                            return r.${rt.getRead(this.lang)}();
                        })` : ''};
                }
            `).join('\n')}
        }`);
    }

    _makeEndLocalByNS(ns, methods) {
        return new CodeFile(ns, GEN.END_LOCAL).append(`
        package ${ns};
        public class ${GEN.END_LOCAL} extends ${GEN.RPC2J}.${GEN.END_LOCAL}{
            public ${GEN.END_LOCAL}(){
            }
            
            protected void _handle(${GEN.RPC2J}.${GEN.TYPE_READER} reader, ${GEN.RPC2J}.${GEN.MESSAGE} message){
                ${this.mapMethods(methods, (i, m, a, r, at, rt)=>`
                    if(message.methodID==${i}){
                        this.${m.name}(${a ? `reader.${at.getRead(this.lang)}()` : ''})${r ? `
                            // .then(ret=>{
                                ${GEN.RPC2J}.${GEN.TYPE_WRITER} writer=new ${GEN.RPC2J}.${GEN.TYPE_WRITER}();
                                ${GEN.RPC2J}.${GEN.MESSAGE} message2=${GEN.RPC2J}.${GEN.MESSAGE}.newResponse(this._newMessageID(), message.messageID);
                                ${GEN.RPC2J}.${GEN.MESSAGE}.write(writer, message2);
                                writer.${rt.getWrite(this.lang)}(ret);
                                this._sendMessage(writer, message2);
                            // })
                            // .catch(error=>{
                                ${GEN.RPC2J}.${GEN.TYPE_WRITER} writer=new ${GEN.RPC2J}.${GEN.TYPE_WRITER}();
                                ${GEN.RPC2J}.${GEN.MESSAGE} message2=${GEN.RPC2J}.${GEN.MESSAGE}.newResponseError(this._newMessageID(), message.messageID);
                                ${GEN.RPC2J}.${GEN.MESSAGE}.write(writer, message2);
                                writer.writeString(error.toString());
                                this._sendMessage(writer, message2);                                
                            // })` : ''};
                    }
                `).join('else')}
            }
            
            ${this.mapMethods(methods, (i, m, a, r, at, rt)=>`
                protected void ${m.name}(${a ? `${at.nameTypeExpr(this.lang)} value` : ''}){
                }
            `).join('\n')}
        }`);
    }

    _makeRemotes(filter, make) {
        var dic = this.methodsGroupByNS();
        var ss = [];
        for (var key in dic) {
            var methods = dic[key].filter(filter);
            if (methods.length) {
                ss.push(make(key, methods));
            }
        }
        return ss;
    }

    make() {
        var codeFiles = [
            this._makeMessage(),
            this._makeReceiver(),
            this._makeEndRemote(),
            this._makeEndLocal(),
            ...this._makeRemotes(item=>item.end != this.end, this._makeEndRemoteByNS.bind(this)),
            ...this._makeRemotes(item=>item.end == this.end, this._makeEndLocalByNS.bind(this)),
            this._makeByteArrayReader(),
            this._makeByteArrayWriter(),
            this._makeTypeReader(),
            this._makeTypeWriter(),
            ...this._makeTypes()
        ];

        codeFiles.forEach(codeFile=> {
            this.writeFile(codeFile, '.java');
        });
    }
}

module.exports = GenJAVA;