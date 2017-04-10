
(gen JAVA   server C:\Users\admin\Desktop\github\rpc2j\test\src\)
(sgen JS     client C:\Users\admin\Desktop\github\rpc2j\test\js\)

(include a.d)

(ns common)
(type UserInfo
    aa:String
    name:[bool]
    sex:[{}]
    aa2:{abc:int test:int}
    sss:[{sss:int cbd:string}])

(type UserInfo334 ss:int)

(method server UserInfo33 [UserInfo] [common.UserInfo])

(method server getTime1 [UserInfo] [common.UserInfo])
(method server getTime4 [UserInfo] [common.UserInfo])
(method server getTime2 [{www:int}] {sss:String})
(method client getTime3 [{name:int sss:[string]}] {abc:int sss:string})


(ns WWW)
(type SSS ss:int cc:string)
