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

    _makeEndRemote() {
        return new CodeFile(GEN.RPC2J, GEN.END_REMOTE).append(`
        export class ${GEN.END_REMOTE} {
            constructor() {
            }
        
            _newMessageID() {
                return 0;
            }
        
            _newRequestMessage(methodID) {
                var messageWriter=new MessageWriter();
                messageWriter.writeByte(0);
                messageWriter.writeInt(this._newMessageID());
                messageWriter.writeDate(new Date());
                messageWriter.writeInt(methodID);
                return messageWriter;
            }
        
            _sendMessage(messageWriter) {
            }
            
            receive(bytes){
            }
        }`);
    }

    _makeEndLocal() {
        return new CodeFile(GEN.RPC2J, GEN.END_LOCAL).append(`
        export class ${GEN.END_LOCAL} {
            constructor() {
        
            }
            
            _newResponseMessage(responseMessageID){
                var messageWriter=new MessageWriter();
                messageWriter.writeByte(1);
                messageWriter.writeInt(this._newMessageID());
                messageWriter.writeDate(new Date());
                messageWriter.writeInt(responseMessageID);
                return messageWriter;
            }
        
            _sendMessage(messageWriter) {
            }
            
            receive(bytes){
                var messageReader=new MessageReader();
            }
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
                    var messageWriter=this._newRequestMessage(${i});
                    ${a ? `messageWriter.${at.getWrite(this.lang)}(value);` : ''}
                    return this._sendMessage(messageWriter)${r ? `
                        .then(messageReader=>{
                            return messageReader.${rt.getRead(this.lang)}();
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
            
            _handle(bytes){
                var messageReader=new MessageReader(bytes);
                var methodID=messageReader.readInt();
                var messageID=messageReader.readInt();
                var time=messageReader.readDate();
                ${this.mapMethods(methods, (i, m, a, r, at, rt)=>`
                    if(methodID==${i}){
                        this.${m.name}(${a ? `messageReader.${at.getRead(this.lang)}()` : ''})${r ? `
                            .then(ret=>{
                                var messageWriter=this._newResponseMessage();
                                messageWriter.${rt.getWrite(this.lang)}(ret);
                                this._sendMessage(messageWriter);
                            }).catch(e=>{
                                
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

    _makeMessageReader() {
        return new CodeFile(GEN.RPC2J, GEN.MESSAGE_READER).append(`
        export class ${GEN.MESSAGE_READER} extends ${GEN.TYPE_READER} {
            /**
             *
             * @param {Uint8Array} bytes
             */
            constructor(bytes){
                super(bytes);
            }
        }`);
    }

    _makeMessageWriter() {
        return new CodeFile(GEN.RPC2J, GEN.MESSAGE_WRITER).append(`
        export class ${GEN.MESSAGE_WRITER} extends ${GEN.TYPE_WRITER} {
        }`);
    }

    make() {
        var codeFiles = [
            this._makeEndRemote(),
            this._makeEndLocal(),
            ...this._makeRemotes(item=>item.end != this.end, this._makeEndRemoteByNS.bind(this)),
            ...this._makeRemotes(item=>item.end == this.end, this._makeEndLocalByNS.bind(this)),
            this._makeByteArrayReader(),
            this._makeByteArrayWriter(),
            this._makeTypeReader(),
            this._makeTypeWriter(),
            this._makeMessageWriter(),
            this._makeMessageReader(),
            ...this._makeTypes()
        ];

        var codes = [`
        import q from 'q';
        `];
        codeFiles.forEach(codeFile=> {
            codes.push(codeFile.getCode());
        });
        this.writeAll(codes.join('\n\n'));
    }
}

module.exports = GenJS;