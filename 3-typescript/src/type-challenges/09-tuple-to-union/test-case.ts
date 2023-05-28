import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 
 * type Arr = ['1', '2', '3']
 * type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
 * 
 * 知识点1
 *   通过 T extends unknown[] 限制类型参数必须是数组
 * 知识点2
 *  T[number] 搞不懂??????, 取出数组中各个索引下的元素??
 *  @link https://stackoverflow.com/questions/59187941/whats-the-tnumber-mean-in-typescript-code
 *  这的Number 意味取出tuple中各个元素的类型，组成一个新的类型
 * 
 *  例如：
 *  type X = TupleToUnion<[1| string]> 
 *      ==> string | 3 | 1 | 2
 *  type Y = TupleToUnion<[1 | number]> 
 *      ==> number
 * 
 * 
 * @link https://github.com/type-challenges/type-challenges/tree/main/questions/00010-medium-tuple-to-union
 */
type TupleToUnion<T extends unknown[]> = T[number]

// type Arr = ['1', '2', '3']
// TupleToUnion<Arr> ==>   '1' | '2' | '3'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]

type X = TupleToUnion<[1| 2| 3 | string]>