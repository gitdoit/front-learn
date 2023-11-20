/**
 * for of 用来遍历可迭代对象
 * 和for in的区别
 *  for...in 语句以任意顺序迭代对象的可枚举属性。
 *  for...of 语句遍历可迭代对象定义要迭代的数据。
 */
//1、迭代数组
let arr = [1,2,3]
// 可以用let 代替 const，如果想在迭代中改变变量
for (const item of arr) {
  console.log(item);
}

// 2、迭代字符串
// ES6 为字符串添加了遍历器接口，所以可以使用for of
let str = 'abc'
for (const s of str) {
  console.log(s);
}

// 3、迭代TypedArray
let iterable = new Uint8Array([0x00, 0xff]);
for (let value of iterable) {
  console.log(value);
}

// 4、迭代Map
let iterableMap = new Map([["a", 1], ["b", 2], ["c", 3]]);

for (let entry of iterableMap) {
  // ["a", 1]
  console.log(entry);
}
// 解构的方式
for (let [key, value] of iterableMap) {
  console.log(value);
}

// 5、迭代Set
let iterableSet = new Set([1, 1, 2, 2, 3, 3]);
for (let value of iterableSet) {
  console.log(value);
}

// 6、迭代arguments
(function() {
  for (let argument of arguments) {
    console.log(argument);
  }
})(1, 2, 3);