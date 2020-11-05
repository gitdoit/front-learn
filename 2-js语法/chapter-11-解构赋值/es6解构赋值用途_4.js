// 1、变量交换
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x);
console.log(y);

// 2、从函数返回多个值
// 返回一个数组
function example () {
  return [1, 2, 3];
}
let [a, b, c] = example();
// 返回一个对象
function example () {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();

// 3、函数参数的定义
// 参数是一组无次序的值，这样再
function f ({ x, y, z }) {
  //... 
}
f({ z: 3, y: 2, x: 1 });

// 4、解析json数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);

// 5、函数参数的默认值
function fun ({ x = 0, y = function () { } } = {}) {
  // 不论怎样，每个参数都不会是undefined
}

// 6、遍历Map解构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + " is " + value);
}