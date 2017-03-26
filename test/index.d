(ns common)
(type UserInfo
    aa:String
    name:[bool]
    sex:[{}]
    aaaa:PWD
    aa2:{abc:int test:int}
    sss:[{sss:int cbd:string}])

(type UserInfo3 ss:int)

(method server getTime1)
(method server getTime2 [{www:int}] {sss:String})
(method client getTime3 [{name:int sss:[string]}] {abc:int sss:string})