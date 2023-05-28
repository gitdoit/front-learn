/**
 * 实现内置的Exclude <T, U>类型，但不能直接使用它本身。
*/

type MyExclude<T,U> = T extends U ? never : T

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'