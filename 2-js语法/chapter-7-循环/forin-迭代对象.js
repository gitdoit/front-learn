var obj = {
    a: 1,
    b: 2,
};
// 普通for循环可以遍历数组，这个for in表达式可以遍历对象中的属性
// 其中 obj 可以替换成一个表达式，如果这个表示是返回 undefined 或 Null 那就不执行
for (p in obj) {
    // 依次打印 a,b
    console.info(p);
    // string
    console.info(typeof p);
    // 1,2
    console.info(obj[p]);
}


// in 的左边可以当作一个复制表达式的左值，每次循环都会执行运算并赋值
// 所以，这里可以用数组存储对象的属性
var arr = [];
var index = 0;
for (arr[index++] in obj) {
    // do nothing
}
// ["a","b"]
console.info(arr);

// 数组也是对象，也可以用这种方式来遍历,但是当这个数组有额外的其他属性的时候
// 会将这个属性也遍历出来
// 给这个数组加一个属性，那再通这种方式遍历就有意思了
arr.a = "1";
for (i in arr) {
    // a这个属性值也会打印
    // 所以idea提示可能会意外的遍历期望之外的属性
    console.info(arr[i]);
}