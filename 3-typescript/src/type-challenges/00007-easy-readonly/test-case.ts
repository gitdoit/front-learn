import type { Equal, Expect } from '@type-challenges/utils'
/**
 * 不要使用内置的Readonly<T>，自己实现一个。
 * 该 Readonly 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 readonly 所修饰。
 * 也就是不可以再对该对象的属性赋值。
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.zh-CN.md
 * 
 * 
 * 
 * 
 */
type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
export type MyReadonly<T> = {
  readonly [K in keyof T] : T[K]
}