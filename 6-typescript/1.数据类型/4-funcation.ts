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