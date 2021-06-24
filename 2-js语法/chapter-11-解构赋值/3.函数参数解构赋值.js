/* ****************************字符串解构赋值****************************************** */
// 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
/* ****************************基本类型解构赋值****************************************** */
// 如果等号右边不是对象，会先转变成对象，再进行解构赋值
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

/* ****************************函数的参数解构赋值****************************************** */
function add([x,y]){
  return x + y
}
add([1,2]) // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);



function move({x = 0, y = 0}) {
  console.log(x);
  console.log(y);
  return [x, y];
}
// 报错 TypeError: Cannot destructure property `x` of 'undefined' or 'null'.
// 因为没有传参，所以函数参数是在对undefined进行解构
move(); 
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]

// 1、给函数参数的解构默认值
// 传参了就用传进来的参数进行解构，解构不成功用默认值
// 不传参就用{}默认值进行解构，反正怎么样参数都有值
function move2({x = 0, y = 0} = {}) {
  console.log(x);
  console.log(y);
  return [x, y];
}
// 如果不传，就会对{}进行解构，没问题
move2();
// 跟上边一样
move2({});

// 2、给参数默认值
// 有点绕，如果不传参，那默认参数就是 { x: 0, y: 0 }，并对它解构
// 如果传参了，就用传进来的参数进行解构，解地出来就赋值，解不出来就undefined
function move3({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move3({x: 3, y: 8}); // [3, 8]
move3({x: 3}); // [3, undefined]
move3({}); // [undefined, undefined]
move3(); // [0, 0]