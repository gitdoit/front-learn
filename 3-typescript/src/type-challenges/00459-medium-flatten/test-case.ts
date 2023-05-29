export const a = 1
/**
 * 在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。
 * 
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/00459-medium-flatten/README.md
 */


type flatten = Flatten<[1,[3, 4], 2,[[[5]]]]> // [1, 2, 3, 4, 5]

type Flatten<T extends any[],P extends any[] = []> = 
  T extends [infer F, ... infer Rest] 
  ? 
    F extends any[] 
    // 注意这里,如果T[0]是数组, 需要把T[0]和Rest都给传到下一次递归中
    // 因为这里不像是函数体中的遍历+递归(那里会保证Rest会被遍历到)
    // 一旦走了这个分支,Rest不传就丢掉了
    ? Flatten<[...F,...Rest],P> 
    : Flatten<Rest,[...P,F]>
  : P

/**
 * function Flatten(T,P = []) {
 * 
 *  if(T不是空数组) {
 * 
 *    if(T[0]是数组) {
 *      return fla([...T[0],...T[1~n]],P)
 *    }else {
 *      return fla(T[1~n],[T[0],...P])
 *    }
 * 
 *  } else{
 *    return P
 *  }
 * 
 * }
 *  
 * 
 * 
 */

