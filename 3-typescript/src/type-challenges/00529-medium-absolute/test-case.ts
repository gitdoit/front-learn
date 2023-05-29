export const a = 1
/**
 * 
 * 实现一个接收string,number或bigInt类型参数的Absolute类型,返回一个正数字符串。
 * 
 * 
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00529-medium-absolute/README.md
 */

type Test = 100;
type Result = Absolute<Test>; // expected to be "100"

type Absolute<N extends number> = `${N}` extends `${'-'}${infer Rest}`  ? Rest : `${N}`