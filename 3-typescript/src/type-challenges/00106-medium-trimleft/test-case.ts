/**
 * 
 * 
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.zh-CN.md
 */

type EscapeChar = ' ' | '\n' | '\t';
//                                           // 递归判断首字母是不是空格啥的，是的话递归下一个
type TrimLeft<S extends string> = S extends `${EscapeChar}${infer Rest}` ? TrimLeft<Rest> : S



type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '