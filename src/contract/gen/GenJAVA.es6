var Gen = require('./Gen.es6'),
    GEN = require('../GEN.es6'),
    odts = require('../odts.es6'),
    CodeFile = require('../CodeFile.es6'),
    P = require('path'),
    FileUtil = require('../../common/FileUtil.es6'),
    LANG = require('../LANG.es6'),
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
            return `${t.getFullName(this.lang)} ${f.name}`;
        });

        codeFile.append(`
        package ${typeNode.ns};
        public class ${typeName} {
            ${this.mapTypeFields(typeNode, (f, t)=>`
            public final ${t.getFullName(this.lang)} ${f.name};`).join('\n')}

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

    make() {
        var codeFiles = [
            this._makeByteArrayReader(),
            this._makeByteArrayWriter(),
            this._makeTypeReader(),
            this._makeTypeWriter(),
            ...this._makeTypes()
        ];

        codeFiles.forEach(codeFile=> {
            this.writeFile(codeFile, '.java');
        });

        // this._makeTypes();
        // console.log(this._makeTypeReader().getCode());
        // console.log(this._makeTypeWriter().getCode());
        // console.log(this._makeODTWriter().getCode());
        // console.log(this._makeODTReader().getCode());
    }
}

module.exports = GenJAVA;