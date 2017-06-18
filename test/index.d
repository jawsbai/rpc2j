
(gen JAVA   server C:\Users\admin\Desktop\github\rpc2j\src\contract\java_contract\src)
(gen JS     client C:\Users\admin\Desktop\github\rpc2j\test\rpc2j.es6)

(ns dic)

(dic HeroType
    aaa:111
    bbb:111
    ddd:llllllll
    sss:[2,3,4,5]
    ss:true
    SS:111)

(dic Str
    zh_ssss:我我我我玩[s]生三世
    bbb:haahahahah
    ss:true
    ddd:2222
    SS:ssssss)

(ns table)

(table Player
    playerId:STRING[50]
    userId:STRING[50]
    online:BOOL
    createTime:TIME
    )

(include a.d)

(ns common)
(type UserInfo
    aa:String
    name:[bool]
    sex:[{}]
    aa2:{abc:int test:int}
    sss:[{sss:int cbd:string}])

(type UserInfo334 ss:[int])

(method server getSSS [UserInfo] [])

(method server getTime1 [] [int])
(method server getTime4 [UserInfo] [common.UserInfo])
(method server getTime2 [{www:int}] {sss:String})

(ns aaaaaaaaaa)
(method server getAAAAAAAAAa int {abc:int sss:string})
(method client getTime3 [{name:int sss:[string]}] {abc:int sss:string})
(method client fillPlayers [{name:int sss:[string]}] {abc:int sss:string})
(method client FFFFFK)


(ns WWW)
(type SSS ss:int cc:string)
