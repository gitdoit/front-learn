export {}

/* ***类型别名**** */
let sum: (x: number,y :number) => number;// 函数类型
//const result = sum(1,2); // sum没有实现!!只是定义了

type PlusMethod = (x :number,y: number) => number;// 给那一长串使用type关键字定义一个别名
let sum2 : PlusMethod; // 直接引用别名定义
//const result2 = sum2(1,2);

/* *****别名常量???***** */
const str : 'wtf?' = 'wtf?'; // 这都是什么奇葩语法?
const num : 1 = 1; // 这不就相当于定义一个常量 public static final int num = 1;


/* ******常量****** */
type Directions = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'; // 定义一个类型别名
let oneOfThem : Directions = 'LEFT';// Directions类型的变量只能取其中一个值

/* ******交叉类型************* */
// | 这种是联合类型, &是交叉类型,代表既是这个又是那个,跟继承差不多个意思
interface IName {
  name :string;
}
interface IAge {
  age: number;
}
type IPerson = IName & IAge & {sex: 'm' | 'f'};// 这种语法真是牛逼了,啥啊这是
let p : IPerson = {name:"123",age: 12,sex:'f'};






