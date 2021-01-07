
/**
 * 
 * 函数中的arguments参数
*       它代表的是调用该函数时传入的参数，可以通过arguments[0]来访问；
*       不论定义时签名上声明了几个参数，调用的时候都可以传任意多个
*       它还有一个属性callee，代表当前的函数，可以用来递归调用当前函数，避免使用函数名耦合
*       callee有一个caller，代表调用当前函数的'人'
*       callee在严格模式下会有异常
 */

/********************************arguments参数**************************************************/
// arguments 代表调用者传递给这个函数的参数
// ECMAScript函数不介意传递进来多少个参数，也不在乎传进来的参数是什么数据类型。
// 即使签名中定义了接受两个，那传递的时候也可以传N个。
function diff () {
  return Number(arguments[0]) - Number(arguments[1]);
}
console.info("演示使用arguments参数", diff(1, 2));

// 将参数转为数组
function argToArr(){
  var arg1 = Array.from(arguments);
  console.log(arg1);
  var arg2 = [...arguments];
  console.log(arg2);
}


/********************************arguments.callee：严格模式报错**************************************************/
// arguments对象还有一个特殊的属性叫做callee，代表的是当前函数
// 阶乘函数
function fac (num) {
  // 由于fac是一个变量名，不像是java里面的方法名，一经定义就不能变，这里可以变的
  // 如果将函数名耦合在算法里面，那么fac的指向一旦改变，就会出问题了
  return num <= 1 ? 1 : num * fac(num - 1);
}

function newFac (num) {
  // 这样定义就避免了耦合函数名的弊端
  return num <= 1 ? 1 : num * arguments.callee(num - 1);
}

/********************************arguments.callee.caller：严格模式报错**************************************************/
// 之前在java里面一直都想获取当前函数调用者的信息，一般也只能通过线程堆栈来拿到
// 这里可以通过属性获取
caller();
function caller () {
  callee();
}
function callee () {
  console.info("是谁调用了我？ ===》", arguments.callee.caller);
}