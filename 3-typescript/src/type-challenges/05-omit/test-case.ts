import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型。
 * Omit 会创建一个省略 K 中字段的 T 对象。
 */
 export type MyOmit<T,I extends keyof T> = {
    [K in Exclude<keyof T,I>] : T[K]
}


type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
    Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
    title: string
    description: string
    completed: boolean
}

interface Expected1 {
    title: string
    completed: boolean
}

interface Expected2 {
    title: string
}
