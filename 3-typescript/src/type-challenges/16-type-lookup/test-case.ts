interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
}

/**
 * 知识点1: T extends {type: U}, extends不光用来表达一个key是否在一个集合中,还用来表达对象类型和目标类型是否相符
 */
type LookUp<T extends {type:string},U > = T extends {type: U} ? T : never


type MyDog = LookUp<Cat | Dog, 'cat'> // expected to be `Dog`