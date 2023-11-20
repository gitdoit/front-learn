export const a = 1;
/**
 * js里面的字面量对象一般也可以当作map使用
 * 但是字面量对象的key只能是字符串
 * Map对象可以将对象或者原始值当作key
 */
//======================创建==============================
// 任何具有Iterator接口并且每个成员都是一个双元素的数组结构的数据
// 都可以当作map构造函数的入参

let mapC = new Map([['name','michael'],['age',22]])
// Map(2) { 'name' => 'michael', 'age' => 22 }
console.log(mapC);

let set = new Set([1,2,3])
let mapFromSet = new Map(set.entries())
// Map(3) { 1 => 1, 2 => 2, 3 => 3 }
console.log(mapFromSet);


//======================key可以是任何对象==============================
let map = new Map();
map.set('1','1');
let obj = {};
map.set(obj,'1')
// true
console.log(map.has(obj))
// true
console.log(map.delete(obj))