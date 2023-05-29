export const a = 1
/**
 * 将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。
 * 知识点:
 * 1. 先声明属性优先级高
 * 2. 再复习一下这坑爹的 | 操作符
 *  typa a = 1 | 2;  
 *  type b = 3 | 4;  
 *  type c = a | b; // ==> 1|2|3|4
 *  "|" 操作符用在 tuple上就是取合集的意思
 * 
 * 
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00599-medium-merge/README.md
 */

type foo = {
  name: string;
  age: string;
}

type coo = {
  age: number;
  sex: string
}

type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}



type Merge<A,B> = {
  [key in (keyof A | keyof B)] : key extends keyof B 
  ? B[key] 
  : key extends keyof A ? A[key] : never
}