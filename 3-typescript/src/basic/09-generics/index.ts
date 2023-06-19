// ts的泛型 和java的基本一致
// 一个泛型的用法
function echo<T> (arg : T) : T {
  return arg;
}
let strValue :string = echo('123');
let numValue :number = echo(123);


// 两个泛型的用法
function swap<T,U>(arr: [T,U]) : [U,T] {
  return [arr[1],arr[0]];
}
let arr: [string,number] = swap([123,'123']);


// 泛型约束,和用extends关键字约束,和Java一样
// 但是厉害的地方在于 鸭子类型:只要叫起来像鸭子就ok. 不像是java那样,必须实现鸭子接口
interface IWithLength{
  length: number;// 接口里面规定一个length属性
}
function showTheLenght<T extends IWithLength> (arg : T) : void {
  console.log(arg.length);
}
showTheLenght('123');// 厉害了,在java里是不可能的.但是字符串有length就行
showTheLenght([1,2]) // 数组也有
showTheLenght({length: 12,ss:123})// 字面量对象也有,这样很自由


// 泛型作用在类和接口上和java一样
interface KeyPair<T,U> {
  key :T
  value: U
}
let a :KeyPair<string,number> = {key: '123',value: 123}