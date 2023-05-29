/**
 * 实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型
 * 
 * 知识点:
 *  1. 目前只有 stirng | number | symbol 可以用来当作对象的key,即index
 *  2. keyof any 意味着任何可以当作key的类型,所以也就是 stirng | number | symbol
 * 
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00527-medium-append-to-object/README.zh-CN.md
 */
export const a = 1

type Test = { id: '1' }


// 我的答案,             这里 K extends string 约束一下,不然不能当作对象的index
type AppendToObject<OBJ,K extends string,V> = {
  [key in keyof OBJ] : OBJ[key]
} & {
  [key in K] : V
}
type Result = AppendToObject<Test, 'value', 1> // expected to be { id: '1', value: 4 }
let myResult : Result = {id: '1',value:1}


// 抄的答案                 这里U约束一下必须是可以当作index的类型
type AppendToObjectCheat<T, U extends keyof any, V> = {
  // 这里的 keyof T|U 其实应该是 (keyof T) | U
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};
type ResultCheat = AppendToObjectCheat<Test, 'value', 1> // expected to be { id: '1', value: 4 }
let cheatResult : ResultCheat = {id: '1',value:1}



type keyofAny = keyof any // ==> string | number | symbol



type TTT<T,U extends string> = (keyof T) | U
type sdfsdf = TTT<Test,'theKey'> //  "id" | "theKey"

