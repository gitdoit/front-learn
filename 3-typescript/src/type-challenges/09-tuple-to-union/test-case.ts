import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 知识点1, 通过 T extends unknown[] 限制类型参数必须是数组
 * 知识点2,T[number] 搞不懂??????, 取出数组中各个索引下的元素??
 */
type TupleToUnion<T extends unknown[]> = T[number]

// type Arr = ['1', '2', '3']
// TupleToUnion<Arr> ==>   '1' | '2' | '3'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]
