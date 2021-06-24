/* ***********************************基本用法*************************************************************** */
/**
 * 本质上这种写法属于模式匹配，只要等号两边模式相同
 * 左边变量就会赋予对应的值
 * */
let [a,b,c] = [1,2,3]
console.log(b);

let [e,[[f],g]] = [4,[[5],6]]
console.log(f);

let [,,h] = [8,9,10]
console.log(h);

let [i,,k] = [11,12,13]
console.log(k);

let [l,...m] = [1,2,3,4]
// [ 2, 3, 4 ]
console.log(m);

let [n,o,...p] = [1,2,3,4,5]
// [ 3, 4, 5 ]
console.log(p);

let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3

/**
 * 这种情况属于不完全结构，此时不成功的变量都会是undefined
 */
let [q,r,s] = [1]
// 1
console.log(q);
// undefined
console.log(r);
// undefined
console.log(s);

/**
 * 错误实例，如果等号右边不是数组或者是不可遍历的（iterable），都会报错
 */
// TypeError: 1 is not iterable
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

/**
 * 使用Set结构可以进行解构赋值
 */
let [x, y, z] = new Set(['a', 'b', 'c']);
console.log(x);

/* ***********************************默认值*************************************************************** */
let [foo = true] = []
console.log(foo);

// ES6内部使用=== 来判断一个未知是否有值，所以当一个数组成员严格等于 undefined时才会启用默认值
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let[x = 1] = [null]
console.log(x); // null

// 惰性求值
function f(){
  console.log('a');
}
// 只有在x启用默认值的时候才会执行f函数，这里f不会执行
let [a = f()] = [1]
console.log(a);

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x = y, y = 1] = [];     // ReferenceError: y is not defined