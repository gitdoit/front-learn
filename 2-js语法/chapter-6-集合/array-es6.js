/* **************************************扩展的运算符**************************************************** */
// https://es6.ruanyifeng.com/?search=Map&x=0&y=0#docs/array
// 定义函数的时候使用...叫做rest参数，调用的时候使用...就相当于rest逆运算
console.log(...[1, 2, 3]);
console.log(5, ...[1, 2, 3], 6);
console.log(...[]);

// 数组合并
var a = [1, 2, 3, 4]
var b = [5, 6, 7]
// a.concat(b) es5的做法
a.push(...b)
console.log(a);

// 数组复制
var a = [1, 2, 3]
// const b = a.concat() es5的做法
const b = [...a]
b[1] = 66
console.log(a);
console.log(b);


// 替代apply用法
function f (x, y, z) {
  console.log(x);
  console.log(y);
  console.log(z);
}
const a = [1, 2, 3]
// f.apply(null,a)
f(...a)

// 简化求出数组中最大值
const a = [1, 3, 22, 224, 23]
console.log(Math.max(...a));

/* **************************************...应用于实现了Iterator接口的对象**************************************************** */
// 对Number类型实现了迭代器接口
Number.prototype[Symbol.iterator] = function* () {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
}
// 就可以使用...运算符
console.log([...5]);

// ...迭代器对象
const go = function* () {
  yield 1;
  yield 2;
  yield 3;
}
console.log([...go()]);

/* **************************************Array.from创建数组**************************************************** */
// 使用类数组对象创建数组，就是属性中包含length的对象，可以用Array.from来创建
const a = {
  '0':'a',
  '1':'b',
  length: 2
}
console.log(Array.from(a));

// 使用实现了迭代器接口的对象，创建数组
console.log(Array.from('1234')); //[ '1', '2', '3', '4' ]
console.log(Array.from(new Set([1,2,3])));//[ 1, 2, 3 ]

const obj = {
  [Symbol.iterator]: function*(){
    yield 1;
    yield 1;
    yield 1;
  }
}
console.log(Array.from(obj)); // [ 1, 1, 1 ]

// Array.from的第二个参数，对每个数组元素进行加工处理;类似map
console.log(Array.from([1,2,3],e => ++e));

/* **************************************Array.of将一组值转换为数组**************************************************** */
console.log(Array.of(1,2,3));
console.log(Array.of(undefined));

/* **************************************数组实例.copyWithin**************************************************** */
// 用于在数组内部进行复制操作，会改变原数组
// 第二和第三个参数是从开始复制并到哪结束，第一个参数是被覆盖的元素起始位置
let a = [1,2,3,4]
console.log(a.copyWithin(0,1,2));// [ 2, 2, 3, 4 ]

/* **************************************数组实例.find  数组实例.findIndex**************************************************** */
// 找到并返回第一个满足条件的元素
console.log([1,2,3].find(e => e == 2)); // 2

// 找到第一个满足条件的元素的下标
console.log([1,2,3].findIndex(e => e == 2)); // 1

// 这两个方法都支持第二个参数，用来绑定回调参数中的this
let a = {arr: 2};
function callBack(e){
  return e === this.arr;
}
console.log([1,2,3].find(callBack,a)); // 不能用箭头函数

/* **************************************数组实例.fill**************************************************** */
// 使用指定的值填充数组
console.log([1,2,3,4].fill(0)); //[ 0, 0, 0, 0 ]

/* **************************************数组实例.entries() keys() values()**************************************************** */
// entries() 对数组下标和值的遍历，即键值对遍历
for(let [index,value] of ['a','b'].entries()){
  console.log(index + ':' + value);
}

// keys() 对数组下标的遍历
for(let index of ['a','b'].keys()){
  console.log(index);
}

// values() 对值的遍历

for(let value of ['a','b'].values()){
  console.log(value);
}

// 这三个方法都返回一个迭代器对象，所以可以使用next手动遍历
let entries = ['a','b'].entries();
console.log(entries.next().value);

/* **************************************数组实例.flat()**************************************************** */
// 用于将数组拉平，即数组中包含另一个数组，把他们拉平成为一个数组
let a = [1,2,[3,4]];
console.log(a.flat()); //[ 1, 2, 3, 4 ]
// 默认只拉平一个深度的数组
let b = [1,2,[3,[4,5]]];
console.log(b.flat()); //[ 1, 2, 3, [ 4, 5 ] ]
// 指定参数，让它拉平二个深度的;可以使用 Infinity 参数，无限拉平
console.log(b.flat(2));//[ 1, 2, 3, 4, 5 ]

/* **************************************数组实例.flatMap()**************************************************** */
// 先对数组中每个元素执行map,然后再执行flat展开
console.log([1,2,3].flatMap(x => [1+x,x])); //[ 2, 1, 3, 2, 4, 3 ]
