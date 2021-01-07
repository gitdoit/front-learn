/* ***********************赋默认值******************************* */
// 如果没传参，则x='3'
function de (x = '3') {
  console.log(x);
}

// 不能使用let或const重复声明
function Point (x = 0, y = 0) {
  let x = 1; // error
  const x = 2;// error
}

// 使用默认值时，函数不能有同名参数
// 不报错
function foo (x, x, y) {
  // ...
}
// 报错
function foo (x, x, y = 1) {
  // ...
}

// 默认值的惰性求值
let x = 99;
function bar (y = x + 1) {
  console.log(y);
}
bar() // 100
x++;
bar(); // 101

/* ***********************赋值解构和默认值******************************* */
// 见 charpter-04变量声明和作用域/es6解构赋值_3.js



/* ***********************默认值之作用域******************************* */
// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域
// 等到初始化结束，这个作用域就会效时。这种行为在不设置默认参数时会消失

// 初始化时参数中的x和y在一个作用域中，外边的x在它的外围作用域中
// 所以y等于的这个x是参数中的x
var x = 1;
function f (x, y = x) {
  console.log(y);
}
f(3); // 3


// 初始化时y所在的作用域里面没有x，就顺着作用域链找到了外边的x
var x = 1
function f(y=x){
  console.log(y);
}
f(); // 1


// 这个初始化时的临时作用域对函数也是一样
let foo = 'outer'
function bar(func = () => foo){
  let foo = 'inner'
  console.log(func());
}
bar();

/* ***********************应用******************************* */
// 指定如果某个参数不传，就直接抛异常
function throwIfMissing() {
  throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()