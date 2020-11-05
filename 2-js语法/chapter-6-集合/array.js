// 创建一个包含三个元素的数组
// 可以使用字面量数组
arr1 = ['1', '2', '3'];
// 可以省略new关键字
var arr1 = new Array(3);
// 可以在创建的时候赋值
arr1 = Array(4);
arr1 = Array('1', '2', '3');


// js的数组和java的不一样
// 第一点是，js中的数组长度是动态增加的，而java中的数组一经初始化就固定了
arr1 = ['1'];
arr1.push('1');
arr1.push('1');
console.info('演示数组长度动态变更' + arr1.length);
// 第二点是，js中的数组可以同时存在多种数据类型的数据
arr1 = [1, '2', { attr: 3 }, [1, 2, 3]];

// 越界访问不会像java那样抛异常，而是直接返回一个undefined
console.info("尝试数组越界" + arr1[11]);

// js种的数组length属性很有意思，它不是只读的，是可以改变的;
arr1 = [1, 2, 3, 4];
arr1.length = 3;
// 这样相当于移除了第四个元素了
console.info("数组种4个元素，执行length=3后，arr1[3]=" + arr1[3]);


// 数组检测
if (arr1 instanceof Array) {
    console.info('使用instanceof检测 arr1,是一个数组');
}
if (Array.isArray(arr1)) {
    console.info('使用Array.isArray检测 arr1 是一个数组')
}


// toString toLocalString valueOf方法;
arr1 = [1, 2, 3, 4];
// 调用数组种每个元素的toString方法，打印 1,2,3,4
console.info('调用数组的toString方法：' + arr1.toString());
// 调用数组中每个元素的toLocalString方法，打印 1,2,3,4
console.info('调用数组的toLocalString方法：' + arr1.toLocaleString());
// 调用素组中每个元素的toString方法，打印 1,2,3,4
console.info('不调数组任何方法直接打印：' + arr1);


var p1 = {
    toString: function () {
        return "toString";
    },
    toLocaleString: function () {
        return "toLocaleString";
    }
};
arrP1 = [p1];
console.info("测试toString数组：" + arrP1.toString());


/**
 * 数组常用方法
   影响原数组的操作：
   splice,sort,reverse,pop,push,shift,unshift
   其他的不影响，js真乱
 */
/************************************栈方法*******************************************/
var arr = [1, 2, 3, 4];
// 跟java的join一样,返回 1,2,3,4
var arrJoin = arr.join("||");

// 栈方法，后进先出
// 向数组末尾压入一个元素
arr.push(5);
// 从数组末尾弹出一个元素
var item = arr.pop();
console.info('pop:' + item)

/************************************队列方法*******************************************/
// pop方法是从队列尾部弹出一个元素，这是栈的行为，如果想像队列一样从一端进  另一端出，可以用shift方法从队头弹出一个元素
var queue = Array();
queue.push("1", "2", "3");
let shift = queue.shift();
console.info("数组1，2，3 调用shift方法弹出的元素是:" + shift + " 此后数组长度为:" + queue.length);

// push方法是向队列尾部添加N个元素，而unshift则是在队列头部添加N个元素
queue = ["2", "3"];
queue.unshift("0", "1");
// 0,1,2,3
console.info("2,3 调用unshift(0,1)后，内容为：" + queue);


/************************************排序方法*******************************************/
var sort = [1, 2, 3, 4, 5];
// 反转数组，这一点需要注意了，跟java不一样，Java中这种类似的方法对原对象不会更改，而这里
// 则是对原数组也会影响，且也有返回值。
console.info("数组1，2，3，4，5 调用reverse 方法后的返回值为：" + sort.reverse() + "  原数组变为：" + sort)

// 由于sort方法是调用数组中每个元素的toString方法，再对这个方法的返回值做排序
// 所以即使数组中的元素是数字，但也按照字符串比较，则排序后变为 0,1,10,15,5
sort = [0, 1, 5, 10, 15];
console.info("数组" + sort + " 调用sort方法后变为:" + sort.sort())

// 跟java一样，sort方法也可以传入一个比较器，按照比较器的返回值去排序
// 注意，这里a，b参数，如果原数组中的类型是number那这里就是number
// 如果是string，这里就是string，此时则会按照字符串一位一位的比较
sort = ['1', '2', '10', '5'];
sort.sort((a, b) => {
    console.info(typeof a);
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
});
console.info("使用自定义比较器比较后的返回值是:" + sort);


/************************************连接方法*******************************************/
// 在java里面连接两个数组没有在这里方便，这里直接调用concat方法就行
// 连接方法不会影响原数组，返回的数组才是连接过后的
// 原理就是把原数组复制一份，然后再进行连接操作
// 那么数组中的元素是对象的话，进行的是深度拷贝还是浅拷贝呢？ ==》 浅拷贝，没那么智能
var concat = [1, 2, 3];
let numbers = concat.concat(4, 5, [6, 7, 8]);
console.info("数组1，2，3调用cancat方法后返回值", numbers)

var copyTest = [{ name: '张三' }];
let c1 = copyTest.concat();
var p = c1[0];
p.name = '里斯';
console.info(copyTest[0].name);

/************************************分割方法:slice*******************************************/
const slice = [1, 2, 3, 4, 5];
let after = slice.slice(2);
// slice对原数组没有影响
// 删除前两项
console.info("数组%s 调用slice(2)后:%s", slice.toString(), after.toString());

/************************************插入、删除、替换方法:splice*******************************************/
const splice = [1, 2, 3, 4, 5];
// 删除元素
splice.splice(0, 2);
console.info("数组1,2,3,4,5 调用splice(0,2) 后移除前两个元素变为：%s", splice.toString());

// 插入元素，语义就是，从第0位开始，删除0个元素，然后在删除的元素后添加 1，2
splice.splice(0, 0, 1, 2);
console.info("数组3,4,5调用.splice(0,0,1,2)后变为:%s ", splice.toString())

// 替换元素，语义就是，从第0位开始，删除1个元素，然后在其后插入8；这就完成了替换
splice.splice(0, 1, 8);
console.info("数组1,2,3,4,5 调用splice.splice(0,1,8)后变为：%s", splice.toString())


/************************************查找方法*******************************************/
var index = [1, 2, 3, 4, 5];
// 找到了就返回下标，没有就返回-1
console.info("数组%s调用 indexOf(3)，返回值为:%s", index.toString(), index.indexOf(3))
// 从第3位开始找值为3的元素
console.info("数组%s调用indexOf(3,3) 返回值为:%s", index.toString(), index.indexOf(3, 3))
// 还有一个lastIndexOf，跟这个差不多，不过那个是倒着找的


/************************************迭代方法*******************************************/
var iter = [1, 2, 3, 4, 5, 6];

// find方法接收三个参数，#1 当前迭代的值，#2 当前数组下标 #3 数组对象
let number = iter.find(((value, i, arr) => {
    return value === 1;
}));


// every方法的会判断每个元素，并返回true或false，若每项都返回true则方法返回值为true，否则false
let b1 = iter.every((item, index, array) => {
    return item > 2;
});
console.info(b1)
// 与之相反的就是some
let b2 = iter.some((item, index, array) => {
    return item > 2;
});
console.info(b2);



// filter方法跟java里面stream的一样,这个不会影响原数组
let afterFilterArray = iter.filter((item, index, array) => {
    return item > 3;
});
console.info("对数组%s掉用filter过滤小于3的元素后", iter.toString(), afterFilterArray.toString());

// map方法也是和java里面stream的一样，也不会影响原数组
let afterMap = iter.map((item, index, array) => {
    return item * 3;
});
console.info("对数组%s 调用map乘以三后 ：%s", iter.toString(), afterMap.toString());

// forEach方法和java里面的stream一样，不演示了

// reduce方法，也是和java里面的类似，那个我都总是忘了怎么用，这个...
// 第一个参数是前一个参数，第二个是当前的参数；
// 那么遍历第一个元素的时候没有前一个怎么办呢？如果reduce中给了第二个参数的话(起始数值),那么pre就是初始值
// 没有初始值，pre=index0，cur=index1;
let reduceSum = iter.reduce((pre, cur, index, array) => {
    console.info(pre + " " + cur);
    return pre + cur;
}, -1);
console.info("reduceSum:" + reduceSum);
