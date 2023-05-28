/**
 * 实现一个通用Pop<T>，它接受一个数组T，并返回一个由数组T的前length-1项以相同的顺序组成的数组
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md
 */
export const a = 1


type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]

// 我的答案
type Pop<T extends any[]> = T extends [... infer D, infer Last] ? D : never
