import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 从指定类型中筛选出只读属性，并返回这些只读属性组成的联合字面量类型
 * @link https://github.com/type-challenges/type-challenges/tree/main/questions/00005-extreme-readonly-keys
 * 1. 如何判断一个属性是否是ReadOnly的？
 * 地域级，我抄的
 */

type GetReadonlyKeys<T, R extends T = Readonly<T>> = {
  [K in keyof T]-?: Equal<Pick<R, K>, Pick<T, K>> extends true ? K : never;
}[keyof T];



interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]
