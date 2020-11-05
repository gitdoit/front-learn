/*学习reduce API的使用，我曾在Java里也写过关于它的API用法，但是很少使用
   *
   * reduce接受的lambda表达式函数，其中的两个参数需要弄明白
   * 可以这样理解
   * 第一个参数是初始值，也是计算结果存储的地方；
   * 第二个参数是被操作数，也就相当于输入参数？？
   *
   * */

/********************************求和**************************************/
var total = [1, 2, 3, 4].reduce((sum, next) => {
    // sum给定初始值0，若不给定那它就是数组中第一个元素的值
    return sum + next;
}, 0);
console.info(total);

/********************************想从一堆人中筛选年龄在18岁的人的名字**************************************/
var peoples = [
    {
        name: 'Harry Potter',
        age: 18
    },
    {
        name: 'Cedric Diggory',
        age: 14
    },
    {
        name: 'Tonks',
        age: 22
    },
    {
        name: 'Ronald Weasley',
        age: 1
    },
    {
        name: 'Hermione Granger',
        age: 18
    }
];
// 方式1，filter+map
const names = peoples.filter((item) => { return item.age === 18 }).map((item) => { return item.name });
// 方式2,咋还是这种看起来更直观，骚操作一般阅读性不好
const forEachNames = [];
peoples.forEach((item) => {
    if (item.age === 18) {
        forEachNames.push(item.name);
    }
});
// 方式3，reduce
const reduceNames = peoples.reduce((array, item) => {
    // 初始值是一个数组，item是入参，也就相当于peoples中的每个元素。
    if (item.age === 18) {
        array.push(item.name);
    }
    return array;
}, []);

/********************************分组，像是stream里的groupBy**************************************/
// 年龄18的分成一组

// 创建一个分组函数，根据criteria来分组
function groupBy (arr, criteria) {
    return arr.reduce((map, item) => {
        // 若是一个函数，则直接调用，不是的话那就是属性名，我们获取这个属性值,根据属性值来进行分组
        let key = typeof criteria === 'function' ? criteria(item) : item[criteria];
        // 存在这个key的话，那就直接放进去
        map.hasOwnProperty(key) ? map[key].push(item) : map[key] = [item];
        return map;
    }, {});
}

// 咱们来试一下,按照年龄分组
let groupName = groupBy(peoples, 'age');
console.info(groupName);

// 按照名字分组
groupName = groupBy(peoples, (item) => {
    return item.name;
});
console.info(groupName);