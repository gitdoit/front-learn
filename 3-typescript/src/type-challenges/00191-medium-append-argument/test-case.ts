/**
 * 实现一个泛型 AppendArgument<Fn, A>，对于给定的函数类型 Fn，以及一个任意类型 A，返回一个新的函数 G。G 拥有 Fn 的所有参数并在末尾追加类型为 A 的参数。
 * 
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00191-medium-append-argument/README.zh-CN.md
 */
export const a = 1


type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// 期望是 (a: number, b: string, x: boolean) => number
// solution1: 丢失了参数名称
type AppendArgument<Fn, A> = 
  Fn extends (...args: infer R) => infer T ? (...args: [...R, A]) => T : never