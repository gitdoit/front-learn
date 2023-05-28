/**
 * 
 *  有时，您可能希望根据某个属性在联合类型中查找类型。
 *  在此挑战中，我们想通过在联合类型Cat | Dog中搜索公共type字段来获取相应的类型。
 *  换句话说，在以下示例中，我们期望LookUp<Dog | Cat, 'dog'>获得Dog，LookUp<Dog | Cat, 'cat'>获得Cat。
 * 
 * @link  https://github.com/type-challenges/type-challenges/blob/main/questions/00062-medium-type-lookup/README.zh-CN.md
 */


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
type LookUp<T extends { type: string }, U> = T extends { type: U } ? T : never

// 写法2， 先判断长得像不像， 再判断值对不对
type ILookUp<T,E> = T extends {type: string} ? T['type'] extends E ? T : never : never
// 写法3， 直接精准判断长相和值
type IILookUp<T,E> = T extends {type: E} ? T : never



type MyDog = LookUp<Cat | Dog, 'cat'> // expected to be `Cat`
type IMyDog = ILookUp<Cat | Dog, 'dog'> // expected to be `Dog`
type IIMyDog = IILookUp<Cat | Dog, 'dog'> // expected to be `Dog`

