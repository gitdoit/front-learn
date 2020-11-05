/**
 * ES6对Number类型新增了几个常用方法
 * 对于Number.isFinite和Number.isNaN和之前的全局
 * 方法的区别是，之前的会将变量先用Number转换一下
 * */

 /**
 * 判断数字是否是有限的
 * 对于非数字类型一律返回false 
 */
Number.isFinite(15) // ture
Number.isFinite(0) // true
Number.isFinite(-1) // true
Number.isFinite(Infinity) // false
console.log(Number.isFinite('ss')); // false


// 判断一个数字是否是NaN
Number.isNaN(Nan) // true
Number.isNaN(2) // false
console.log(Number.isNaN('a'/'b')); // true

// 判断一个数值是否是整数
console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(12.3)); // false
console.log(Number.isInteger('')); // false
console.log(Number.isInteger(true)); // false
// 注意JS的数值存储精度为64位双精度格式，数值精度为53个二进制位，超出的被截断。下面的就超了
console.log(Number.isInteger(3.0000000000000002) );// true

