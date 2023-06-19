export const a = 1;

/**
 * 实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。
 * 
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.zh-CN.md
 */
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
// 我的答案
type Last<T extends unknown[]> = T extends[...infer Rest,infer P] ? P : never
type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1

