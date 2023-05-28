import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。
 * 
 * const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
 * type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
 * 
 * https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.zh-CN.md
 */
type TupleToObject<T extends readonly any[]> = {
    // T[number] 的意思是： 元组中每个元素的类型
    // 那这里不就代表着  'tesla'| 'model 3' | 'model X' | 'model Y'
    // 组合起来 K in T[number] 就是，K 是在'tesla'| 'model 3' | 'model X' | 'model Y' 之中的任意类型
    [K in T[number]] : K


    // K in keyof T 和这个有什么关系？
    // keyof T 这个表示访问元组中每个元素本身的索引下标
    // [K in keyof T] 表示 K是在元素索引的任意位置
    // 组合起来 [K in keyof T]: T[K] 返回的就是元组本身
    // [K in keyof T]: T[K]
}
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type tupleObj  = TupleToObject<typeof tuple>



const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]


type error = TupleToObject<[[1, 2], {}]>
