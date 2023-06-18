export {}

// 基本类型数组
let arrOfNumbers : number[] = [1,2,3];
// 复合类型数组
let info :[string, number] = ['str',1];
// info.push(true) errir
info.push(123);



// 元组 tuple
type MyTuple = [number,'a',false]
// 固定每个index位置的类型
const arr: MyTuple = [1,'a',false]