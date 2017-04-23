var Gen = require('./Gen.es6'),
    GEN = require('../GEN.es6'),
    END = require('../END.es6'),
    odts = require('../odts.es6'),
    CodeFile = require('../CodeFile.es6'),
    P = require('path'),
    FileUtil = require('../../common/FileUtil.es6'),
    LANG = require('../LANG.es6'),
    firstCharUpper = require('../firstCharUpper.es6');

class GenJS extends Gen {
    constructor(gen, nodeList) {
        super(gen, nodeList);
    }

    _renameNS(ns) {
        return ns.split('.').join('_');
    }

    _fullName(typeNode) {
        return `${this._renameNS(typeNode.ns)}_${typeNode.name}`;
    }

    _makeTypes() {
        return this._nodeList.findTypes().map(typeNode=>this._makeType(typeNode));
    }

    _makeType(typeNode) {
        var typeName = typeNode.name;
        var fullName = this._fullName(typeNode);
        var codeFile = new CodeFile(typeNode.ns, typeName);

        var args = this.mapTypeFields(typeNode, (f, t)=>`${f.name}`);
        var args2 = this.mapTypeFields(typeNode, (f, t)=>t.getEmpty2(this.lang));

        codeFile.append(`
         export class ${fullName}{
            /**
            ${this.mapTypeFields(typeNode, (f, t)=>`
             * @param {${t.nameTypeExpr2(this.lang)}} ${f.name}`).join(',')}
             */
            constructor(${args.join(',')}){
                ${this.mapTypeFields(typeNode, (f, t)=>`
                this.${f.name}=${f.name};`).join('\n')}
            }
            
             /**
              * @return {${fullName}}
              */
            static empty(){
                return new ${fullName}(${args2.join(', ')});
            }
        }`);

        return codeFile;
    }

    _makeByteArrayReader() {
        var templete = P.join(P.dirname(__dirname), 'js_templete/ByteArrayReader.es6');
        var code = FileUtil.readString(templete);

        code = code.replace('class ByteArrayReader', `export class ByteArrayReader`);

        return new CodeFile(GEN.RPC2J, GEN.BYTE_ARRAY_READER).append(code);
    }

    _makeByteArrayWriter() {
        var templete = P.join(P.dirname(__dirname), 'js_templete/ByteArrayWriter.es6');
        var code = FileUtil.readString(templete);

        code = code.replace('class ByteArrayWriter', `export class ByteArrayWriter`);

        return new CodeFile(GEN.RPC2J, GEN.BYTE_ARRAY_WRITER).append(code);
    }

    _makeTypeReader() {
        return new CodeFile(GEN.RPC2J, GEN.TYPE_READER).append(`
        export class ${GEN.TYPE_READER} extends ${GEN.BYTE_ARRAY_READER} {
            /**
             *
             * @param {Uint8Array} bytes
             */
            constructor(bytes){
                super(bytes);
            }
            
            ${this.mapODTS((t, n)=>`
            /**
             *
             * @return {[${n}]}
             */
             read${firstCharUpper(n)}Array(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.read${firstCharUpper(n)}();
                }
                return array;
            }`).join('\n')}
            
            ${this.mapTypes((t, ns, n)=>`
            /**
             *
             * @return {${this._fullName(t)}}
             */
            read${firstCharUpper(n)}(){
                return new ${this._fullName(t)}(
                ${this.mapTypeFields(t, (f, t2)=>`
                this.${t2.getRead(this.lang)}()`).join(',')}
                );
            }
            /**
             *
             * @return {[${this._fullName(t)}]}
             */
            read${firstCharUpper(n)}Array(){
                var length=this.readInt();
                var array=new Array(length);
                for(var i=0;i<length;i++){
                    array[i]=this.read${firstCharUpper(n)}();
                }
                return array;
            }`).join('\n')}
        }`);
    }

    _makeTypeWriter() {
        return new CodeFile(GEN.RPC2J, GEN.TYPE_WRITER).append(`
        export class ${GEN.TYPE_WRITER} extends ${GEN.BYTE_ARRAY_WRITER} {
            
            ${this.mapODTS((t, n)=>`
            /**
             *
             * @param {[${n}]} array
             */
            write${firstCharUpper(n)}Array(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.write${firstCharUpper(n)}(array[i]);
                }
            }`).join('\n')}
            
            ${this.mapTypes((t, ns, n)=>`
            /**
             *
             * @param {${this._fullName(t)}} value
             */
            write${firstCharUpper(n)}(value){
                ${this.mapTypeFields(t, (f, t2)=>`
                this.${t2.getWrite(this.lang)}(value.${f.name});
                `).join('\n')}
            }
            /**
             *
             * @param {[${this._fullName(t)}]} array
             */
            write${firstCharUpper(n)}Array(array){
                var length=array.length;
                this.writeInt(length);
                for(var i=0;i<length;i++){
                    this.write${firstCharUpper(n)}(array[i]);
                }                
            }`).join('\n')}
        }`);
    }

    _makeMessage() {
        return new CodeFile(GEN.RPC2J, GEN.MESSAGE).append(`
        export class ${GEN.MESSAGE}{
            constructor(type, messageID, time, methodID){
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
                return new ${GEN.MESSAGE}(
                    reader.readByte(),
                    reader.readInt(),
                    reader.readDate(),
                    reader.readInt()
                );
            }
            
            static write(writer, message){
                writer.writeByte(message.type);
                writer.writeInt(message.messageID);
                writer.writeDate(message.time);
                writer.writeInt(message.methodID);
            }
                
            static newRequest(messageID, methodID){
                return new ${GEN.MESSAGE}(1, messageID, new Date(), methodID);
            }
            
            static newResponse(messageID, responseID){
                return new ${GEN.MESSAGE}(2, messageID, new Date(), responseID);
            }
            
            static newResponseError(messageID, responseID){
                return new ${GEN.MESSAGE}(3, messageID, new Date(), responseID);
            }
        }`);
    }

    _makeReceiver() {
        return new CodeFile(GEN.RPC2J, GEN.RECEIVER).append(`
        export class ${GEN.RECEIVER} {
            constructor(remote, local) {
                this._remote=remote;
                this._local=local;
            }
            
            receive(bytes){
                var reader=new ${GEN.TYPE_READER}(bytes);
                var message=${GEN.MESSAGE}.read(reader);
                if(message.type==1 || message.type==3){
                    this._remote._handle(reader, message);
                }else if(message.type==2){
                    this._local._handle(reader, message);
                }
            }
        }`);
    }

    _makeEndRemote() {
        return new CodeFile(GEN.RPC2J, GEN.END_REMOTE).append(`
        export class ${GEN.END_REMOTE} {
            constructor() {
            }
        
            _newMessageID() {
                return 0;
            }
        
            _sendMessage(writer, message) {
            }
            
            _handle(reader, message){
            }
        }`);
    }

    _makeEndLocal() {
        return new CodeFile(GEN.RPC2J, GEN.END_LOCAL).append(`
        export class ${GEN.END_LOCAL} {
            constructor() {
        
            }
        
            _newMessageID() {
                return 0;
            }
        
            _sendMessage(writer, message) {
            }
            
            
            _handle(reader, message){
            }
        }`);
    }

    _makeEndRemoteByNS(ns, methods) {
        return new CodeFile(GEN.RPC2J, GEN.END_REMOTE).append(`
        export class ${this._renameNS(ns)}_${GEN.END_REMOTE} extends ${GEN.END_REMOTE}{
            constructor(){
                super();
            }
            
            ${this.mapMethods(methods, (i, m, a, r, at, rt)=>`
                /**
                *
                ${a ? `* @param {${at.nameTypeExpr2(this.lang)}} value` : ''}
                ${r ? `* @return {q<${rt.nameTypeExpr2(this.lang)}>}` : ''}
                */
                ${m.name}(${a ? 'value' : ''}){
                    var writer=new ${GEN.TYPE_WRITER}();
                    var message=${GEN.MESSAGE}.newRequest(this._newMessageID(), ${i});
                    ${GEN.MESSAGE}.write(writer, message);
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
        return new CodeFile(GEN.RPC2J, GEN.END_LOCAL).append(`
        export class ${this._renameNS(ns)}_${GEN.END_LOCAL} extends ${GEN.END_LOCAL}{
            constructor(){
                super();
            }
            
            _handle(reader, message){
                ${this.mapMethods(methods, (i, m, a, r, at, rt)=>`
                    if(message.methodID==${i}){
                        this.${m.name}(${a ? `reader.${at.getRead(this.lang)}()` : ''})${r ? `
                            .then(ret=>{
                                var writer=new ${GEN.TYPE_WRITER}();
                                var message2=${GEN.MESSAGE}.newResponse(this._newMessageID(), message.messageID);
                                ${GEN.MESSAGE}.write(writer, message2);
                                writer.${rt.getWrite(this.lang)}(ret);
                                this._sendMessage(writer, message2);
                            })
                            .catch(error=>{
                                var writer=new ${GEN.TYPE_WRITER}();
                                var message2=${GEN.MESSAGE}.newResponseError(this._newMessageID(), message.messageID);
                                ${GEN.MESSAGE}.write(writer, message2);
                                writer.writeString(error.toString());
                                this._sendMessage(writer, message2);                                
                            })` : ''};
                    }
                `).join('else')}
            }
            
            ${this.mapMethods(methods, (i, m, a, r, at, rt)=>`
                /**
                *
                ${a ? `* @param {${at.nameTypeExpr2(this.lang)}} value` : ''}
                ${r ? `* @return {q<${rt.nameTypeExpr2(this.lang)}>}` : ''}
                */
                ${m.name}(${a ? 'value' : ''}){
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

        var codes = [`
        import Q from 'q';
        `];
        codeFiles.forEach(codeFile=> {
            codes.push(codeFile.getCode());
        });
        this.writeAll(codes.join('\n\n'));
    }
}

module.exports = GenJS;