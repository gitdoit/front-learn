/**
 * 对象的解构与数组有一个重要的不同。
 * 数组的元素是按次序排列的，变量的取值由它的位置决定；
 * 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
 */
// 1 基本用法
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined

// 2、结构对象方法
let { log, sin, cos } = Math;
// 例二
const { log } = console;
log('hello') // hello

// 3、当变量名与属性名不一致,注意 : 前面是模式，后面才是被赋值的变量
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

// 4、嵌套的结构赋值
let obj = {
  p: [
    'hello',
    { y: 'js' }
  ]
}
let { p: [a, { y }] } = obj
console.log(a);
console.log(y);

// 5、解构赋值给定义好的变量
let obj = {};
let arr = [];
// 这种语法很奇怪:如果不加()，那么首行是{}，js引擎会把它理解为代码块，会出现语法错误
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

// {prop:123}
console.log(obj);
// [true]
console.log(arr);

// 6、嵌套解构，如果父对象不存在会报错
// 不存在foo对象
let {foo: {bar}} = {baz: 'baz'};

/* ***********************************默认值********************************************** */
let {x = 3} = {} // x = 3
let {x: y = 3} = {} // y = 3

