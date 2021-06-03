let stringType :string = 'ok!!!';
// 原始数据类型.ts:2:1 - error TS2322: Type 'number' is not assignable to type 'string'.
// stringType = 123
let templateString :string = `Are you ${stringType} ?`;


let booleanType :boolean = false;
// 报错
// booleanType = new Boolean(1);
booleanType = true;


let numberType :number = 6;
numberType = 0xf012;
numberType = 0b1010;
numberType = 0o12;
numberType = NaN;
numberType = Infinity;


// null和undefined是其他基本类型的自类型,所以可以赋给number
let und :undefined = undefined;
let nul :null = null;
let num :number = 123;
num = und;
num = nul;

let fuck :number = undefined;


// 和java一样  不返回东西就是个void
function voidFun() :void {
  alert('i return nothing')
}


// any 声明数据是任意类型 和js一样了
// 不声明变量类型的作用和使用any声明一样
let an :any = 123;
an.whatisTheFuck('sdsfsdf');


// 类型推断
let a = 'my be a string'
// error,声明的时候赋字符串,变量就会被推断为字符串类型,后续再赋其他类型的值就会编译错误
// a = 7;

// 声明的时候不赋值,就会被推断为any,后续可以赋任何值
let b;
b = 'sdfsdf'


// 联合类型,就是可以是a类型也可以是b类型 
let unio :string|number = 123;
unio = 'okok';
unio = 7;
// 这就不行
// unio = false;
// 这个API可不兴用啊 宝友,联合类型必须的api必须是多个类型的交集部分
// unio.length
//这个可以
unio.toString