
export const sfsf = 1

/**
 * 实现内置的Exclude <T, U>类型，但不能直接使用它本身。
 * @link https://github.com/type-challenges/type-challenges/tree/main/questions/00043-easy-exclude
 * 
 * 
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
type MyExclude<T,U> = T extends U ? never : T

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
