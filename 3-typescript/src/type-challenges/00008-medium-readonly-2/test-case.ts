import type { Alike, Expect } from '@type-challenges/utils'
/**
 * 实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。
 * K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.zh-CN.md
 * 
 * 知识点：
 *  1， K extends keyof T = keyof T,泛型默认值；
 *  2， & 操作符取两种类型的并集，如果属性在前面的类型中已经声明过了，这里再声明就没有作用 也就是前面声明的属性优先级高
 */


// 总体思路时，将第二个泛型中所有的属性设置为 readonly
type MyReadonly2<T,K extends keyof T = keyof T> = {
    // 先把目标属性全部设置为 只读
    readonly[P in K] : T[P]
} & {
    // 利用交叉类型
    [I in Exclude<keyof T,K>] : T[I]
}


type A = {
  a: string
  b: string
}

type B = {
  a: string
  c: string
}

type C = A & B
type D = A | B

let d :C = {a:"",b:"",c:""}
let e :D = {b:"",a:""}


type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
