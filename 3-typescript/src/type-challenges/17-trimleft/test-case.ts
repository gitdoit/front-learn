/**
 * 厚礼蟹
 * 还能这么整???这怎么学? 玄学
 * 
 */

type EscapeChar = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends`${EscapeChar}${infer Rest}` ? TrimLeft<Rest> : S



type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '