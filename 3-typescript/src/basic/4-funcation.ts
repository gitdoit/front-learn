// 函数声明
function add(a : number, b: number ,c ?: number) :number {
  if(typeof c === "number"){
    return a + b + c;
  }
  return a + b;
}
// 函数表达式
const funType =  (x :number,y:number, z?: number) : number=> {
  return x + y;
}
// 这比较有意思了,f的类型就是下面那一长串
let f :(x :number,y :number ,z ?:number) => number = funType;

// 在接口中定义函数类型,不怎么理解
interface FunType{
  (x :number,y :number ,z ?:number) :number;
}

let c: FunType = funType;

/**
 * [剩余参数]
 * @link https://www.geeksforgeeks.org/explain-about-rest-parameters-and-arguments-in-typescript/
 * 
 * TS中的剩余参数类型必须是一个数组, 这里比较反直觉
 * 直觉上以为可以用 fn(...args: number) 表示函数接收0或多个数字类型参数
 * 但实际上却要 fn(args: number[]) 来达到期望
 * 
 * 
 * 1. 剩余参数必须在参数列表中的最后出现, 和java一样
 * 2. 剩余参数必须是数组类型(因为这里是TypeScirpt,所以剩余参数是一个数组; or  因为剩余参数是一个数组,所以要声明为数组? Since here it is TypeScript being into the picture, so the type of rest parameter is of an Array type (further the array could be string data type or number data type or anything))
 * 3. 剩余参数可以接收0或多个指定类型的参数
 * 4. 一个函数只能声明一个剩余参数(要是有多个就不满足规则1了)
 */
function restArg(a: string,b:number,...other: string[]) {

}

// 点点点到你怀疑人生
// 前面...代表的是剩余参数, 这个剩余参数的类型是一个tuple
// tuple里面 第一个参数类型是1 第二个是2,后面的都是字符串
function tupleLike(...ids: [1,2,...string[]]) { }
tupleLike(1,2,'')
// 和上面一样
function tupleLikeEq(a: 1,b:2,...others: string[]) { }
tupleLikeEq(1,2,'')


// 没有类型的剩余参数还是tuple?
function noTypeOrTuple(...args: []){}
// 你以为是声明了一个没有给类型的剩余参数
// 其实你的剩余参数类型是一个空的 tuple,里面啥也没有
// 效果就是一个无参函数
noTypeOrTuple()


// 这俩还是一样,只不过第二个用tuple包裹了一下
function restString(...args: string[]) {}
function restStringEq(...args: [...string[]]){}
restString('xxx')
restStringEq('xxx')



// 那如果我剩余参数是一个数组怎么整?
// 这样整!
function restAllArr(...args: string[][]) {

}
restAllArr(['xxx'],['xx'])