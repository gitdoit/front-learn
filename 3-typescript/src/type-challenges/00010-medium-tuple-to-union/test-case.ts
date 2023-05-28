import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 实现一个类型，它返回元组中所有值的类型组成的联合类型
 * 
 * @link https://github.com/type-challenges/type-challenges/tree/main/questions/00010-medium-tuple-to-union
 * 
 * 知识点1
 *  通过 T extends unknown[] 限制类型参数必须是数组
 * 知识点2
 *  T[number] 搞不懂??????, 取出数组中各个索引下的元素??
 *  @link https://stackoverflow.com/questions/59187941/whats-the-tnumber-mean-in-typescript-code#:~:text=In%20the%20case%20of%20an%20index%20signature%20as,You%E2%80%99re%20allowed%20to%20use%20those%2C%20but%20Array%20doesn%E2%80%99t.
 *  T[number] 表示取出数组中所有的元素,用在这里的意思是取出元组中每个元素的类型
 * 
 */
type TupleToUnion<T extends unknown[]> = T[number]

// type Arr = ['1', '2', '3']
// TupleToUnion<Arr> ==>   '1' | '2' | '3'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]
type What = [a: string]
let c: What = ['']



type PickEaceType<T> = T extends any[] ? T[number] : T

// --> string
type allString = PickEaceType<string[]>
// --> 1|2|3
type tuples = PickEaceType<1|2|3>
// --> number
type numbers = PickEaceType<number[]>
// --> string | number
type  mix = PickEaceType<[1,2,3,string,number]>




const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type TupleToObject<T extends readonly any[]> = {
  [key in  T[number]] : string
}

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
