
/*
* js的数据类型分为两类：原始类型和对象类型
* 原始类型：
*   1、数字、字符串、布尔值、null、undefined
* 对象类型：
*   对象是属性的集合，每个属性都由键值对构成，其中值可以是原始值、也可以是对象
* 特殊对象类型：
*   数组、函数
* 常用对象类型
*   日期、正则、错误
* */

/*
* js不区分整数值和浮点数值，在js中所有的数字均使用浮点数值表示，并使用64位浮点格式表示数字。
* js在算数运算时溢出、下溢、被零整除时不会报错，溢出的时候结果未 Infinity,下溢的时候是-Infinity,这个Infinity是一个全局变量
* 0除0是一个NaN，这也是个全局变量；
*
*
* NaN，这个比较特殊，它和谁都不相等，包括自己，也就是说 NaN == Nan 返回false；
*
*
* */


/* *************************************数字表示语法************************************************ */
// 16进制
const n16 = 0xcaf;
console.info(n16);
// 8进制
const n8 = 0o10;
console.info(n8);
// 10进制
const n10 = 123;
console.info(n10);

// 浮点数
const f = 12.23;
const f1 = .23;

// 浮点数精度问题
const f2 = .3 - .2;
const f3 = .2 - .1;

// 不相等，因为有误差
var isEquals = f3 == f2;

// 相等
var isEquals1 = f3 == .1;

/* *************************************Number常用API******************************************************* */
var a = new Number(123)
console.log(123 === a) // false
console.log(a instanceof Number); // true

var b = Number(123)
console.log(123 === b); // true
console.log(b instanceof Number); // false




// 转换成数字
console.log(Number('123')); // 123
console.log(Number('0123')); // 123
console.log(Number('')); // 0
console.log(Number('0x11')); // 17
console.log(Number('oj8k')); // NaN
console.log(Number('123e-1')); // 12.3




/* *************************************Number常量******************************************************* */
// 两个可表示(representable)数之间的最小间隔。
Number.EPSILON
// JavaScript 中最大的安全整数 (253 - 1)。
Number.MAX_SAFE_INTEGER
// 能表示的最大正数。最小的负数是 -MAX_VALUE。
Number.MAX_VALUE
// JavaScript 中最小的安全整数 (-(253 - 1)).
Number.MIN_SAFE_INTEGER
// 能表示的最小正数即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE。
Number.MIN_VALUE
// 特殊的“非数字”值。
Number.NaN
// 特殊的负无穷大值，在溢出时返回该值。
Number.NEGATIVE_INFINITY
// 特殊的正无穷大值，在溢出时返回该值。
Number.POSITIVE_INFINITY
// Number 对象上允许的额外属性。
Number.prototype