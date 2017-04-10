var Gen = require('./Gen.es6'),
    GEN = require('../GEN.es6'),
    odts = require('../odts.es6'),
    CodeFile = require('../CodeFile.es6'),
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
        }).join(',');

        codeFile.append(`
        package ${typeNode.ns};
        public class ${typeName} {
            ${this.mapTypeFields(typeNode, (f, t)=>`
            public final ${t.getFullName(this.lang)} ${f.name};`).join('\n')}

            public ${typeName}(){
                ${this.mapTypeFields(typeNode, (f, t)=>`
                this.${f.name}=${t.getEmpty(this.lang)};`).join('\n')}
            }

            public ${typeName}(${args}){
                ${this.mapTypeFields(typeNode, (f, t)=>`
                this.${f.name}=${f.name};`).join('\n')}
            }

            public static ${typeName} newEmpty(){
                return new ${typeName}();
            }

            public static ${typeName} create(${args}){
                return new ${typeName}(${this.getTypeFieldNames(typeNode).join(',')});
            }
        }`);

        return codeFile;
    }

    _makeByteArrayReader() {
        return new CodeFile(GEN.RPC2J, GEN.BYTE_ARRAY_READER).append(`
        package ${GEN.RPC2J};
        import java.util.Date;
        public class ${GEN.BYTE_ARRAY_READER} {
            public ${GEN.BYTE_ARRAY_READER}(){
            }
            
            public Boolean readBoolean(){
                return false;
            }
            public Byte readByte(){
                return 0;
            }
            public Short readShort(){
                return 0;
            }
            public int readInt(){
                return 0;
            }
            public Date readDate(){
                return new Date();
            }
            public String readString(){
                return "";
            }
        }`);
    }

    _makeByteArrayWriter() {
        return new CodeFile(GEN.RPC2J, GEN.BYTE_ARRAY_WRITER).append(`
        package ${GEN.RPC2J};
        import java.util.Date;
        public class ${GEN.BYTE_ARRAY_WRITER} {
            public ${GEN.BYTE_ARRAY_WRITER}(){
            }
            
            public void writeBoolean(Boolean value){}
            public void writeByte(Byte value){}
            public void writeShort(Short value){}
            public void writeInt(int value){}
            public void writeDate(Date value){}
            public void writeString(String value){}
        }`);
    }

    _makeTypeReader() {
        return new CodeFile(GEN.RPC2J, GEN.TYPE_READER).append(`
        package ${GEN.RPC2J};
        public class ${GEN.TYPE_READER} extends ${GEN.RPC2J}.${GEN.BYTE_ARRAY_READER} {
            ${this.mapTypes((t, ns, n)=>`
            public ${ns}.${n} read${firstCharUpper(n)}(){
                return ${ns}.${n}.create(
                ${this.mapTypeFields(t, (f, t2)=>`
                ${t2.getRead(this.lang)}()`).join(',')}
                );
            }`).join('\n')}
        }`);
    }

    _makeTypeWriter() {
        return new CodeFile(GEN.RPC2J, GEN.TYPE_WRITER).append(`
        package ${GEN.RPC2J};
        public class ${GEN.TYPE_WRITER} extends ${GEN.RPC2J}.${GEN.BYTE_ARRAY_WRITER} {
            ${this.mapTypes((t, ns, n)=>`
            public void write${firstCharUpper(n)}(${ns}.${n} value){
                ${this.mapTypeFields(t, (f, t2)=>`
                ${t2.getWrite(this.lang)}(value.${f.name});`).join('\n')}
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