
/* ************************** 使用let命令声明的变量有作用域*********************************************** */
{
  let a = 10
  var b = 11
}
// ReferenceError: a is not defined
console.info(a)
console.info(b)

// 由于var声明的变量属于全局的
// 所以循环之后index=10
// 如果使用let变量来声明index，则会出现期望的log
var arr1 = []
for (var index = 0; index < 10; index++) {
  arr1[index] = function() {
    console.log(index);
  }
}
// 10
arr1[2]()


/* ************************** 使用let命令不会变量提升*********************************************** */
// undefined
console.log(foo);
var foo = 10
// ReferenceError: Cannot access 'bar' before initialization
console.log(bar);
let bar = 11

/* ************************** 暂时性死区 *********************************************** */
// 只要块级作用域存在let命令，它所声明的变量就会绑定到这个区域，不再收到外部影响
var tmp = 123
if(true){
  tmp = 'abc'
  // ReferenceError: Cannot access 'tmp' before initialization
  let tmp
}

// 报错，x=y，此时y还没有声明
// 如果 y=2,x=y 就没事
function fun1(x=y,y=2){
  return [x,y]
}
fun1()

/* ************************** ES6块级作用域 *********************************************** */
// let命令实际上为JS添加了块级作用域
function f1(){
  let n = 5
  {
    // 不受外层影响
    let n = 10
  }
  console.log(n);
}
// 5
f1()

/* ************************** ES6-const命令 *********************************************** */
// 这个命令和java里面的final类似，声明的时候必须立即初始化，以后不能改变
const PI = 3.14
// TypeError: Assignment to constant variable
PI = 2
// SyntaxError: Missing initializer in const declaration
const foo;

// const的作用域和let相同，且不会变量提升，也有暂时性死区
{
  const BAR = 4;
}
//ReferenceError: BAR is not defined
console.log(BAR);

/* ************************** ES6-const命令的本质 *********************************************** */
/**
 * 和final一样，都是固定指针，如果指向对象，对象里面的属性可变，指针不能变
 * 如果指向基本类型，就不能变
 */
const array = []
// ok
array.push(1)
// TypeError: Assignment to constant variable.
array = []

// 冻结对象
const frees = {}
frees.a = 1
Object.freeze(frees)
frees.b = 2
// 常规模式 undefined，严格模式报错
console.log(frees.b);
