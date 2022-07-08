import type { Alike, Expect } from '@type-challenges/utils'
/**
 * 实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。
 * K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。
 * 
 */

// 知识点1, K extends keyof T = keyof T,泛型默认值
// 如果没有传入第二个泛型参数,则第二个泛型默认赋值为keyof T
type MyReadonly2<T,K extends keyof T = keyof T> = {
    readonly[P in K] : T[P]
} &{
    // 知识点2,& 操作符取两种类型的并集
    [I in Exclude<keyof T,K>] : T[I]
}






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
