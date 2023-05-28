import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型。
 * Omit 会创建一个省略 K 中字段的 T 对象。
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.zh-CN.md
 * @link https://juejin.cn/post/7199447328306364473#heading-4
 * 
 * 
 * 这道题的关键点在于如何排除T对象中的K属性？
 *  使用官方自带 Exclude<T,K> 来求出T和K的差集;
 * 
 * 看了下官方的Exclude类型，需要知道以下知识点
 *  知识点1： 对于 extneds关键字作用域联合类型时，使用 乘法分配律 理解
 * 
 * 如有类型： type Type<T,K>  = T extends K ? true : false
 * 这样使用： type test = Type<'a'|'b',1>  
 *              ==>  ('a' extends 1 ? true : flase ) | ('b' extends 1 ? true : flase )
 *                  ==> false
 * 这样使用：type test = Type<1|'b',1>
 *              ==>  (1 extends 1 ? true : flase ) | ('b' extends 1 ? true : flase )
 *                  ==> true | false
 *                      ==> boolean
 */

// 这是官方的Exclude类型实现
// 其中的T如果时
type MyExclude<T,U> = T extends U ? never : T


// 从T中排除掉I，得到一个新类型
type MyOmit<T,I extends keyof T> = {
    [K in MyExclude<keyof T,I>] : T[K]
}

type error = MyOmit<Todo, 'description' | 'title'>

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
type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
    Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]