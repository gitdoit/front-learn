/*
* 首先说建议
*   建议使用===代替==，但为了能读懂别人的代码，还是需要知道==和===的关系和区别；
*
* == 和 === 的区别和联系
*   === 会比较两个参数的类型，若类型相同然后再判断值是否相同
*   == 若两个参数类型不一样，则会进行类型转换，然后进行比较
*
*
* 先看一下这两种比较的定义
* 一、 x === y
*   1、若x和y的类型不一样，则直接返回false；('s' 和 new String('s') 不是一种类型，一个是string,一个是Object)
*       如果相同
*       2、Undefined  =>true
*       3、null  => true
*       4、string => 跟java一样，按位比较;(注意new String是对象，即使内容一样也是false)
*       5、boolean => 都是true或者都是false的时候返回true，注意包装类型无论怎样都是false
*       6、Symbol,如果x和y是相同的Symbol值，返回true
*       7、number => 首先排除包装类型
*           1、简单类型，值相等返回true，否则false
*           2、若一个是+0 一个是-0,那么返回true
*           3、如果x或y至少有一个是NaN的话，那么返回false
* 二、x == y
*   1、如果类型相同返回 === 的结果
*   2、如果不同
*       1、null == undefined => true
*       2、Number == String => 会将String 调用 ToNumber(String)的返回值，再比较
*       3、Boolean == AnyType => 会将Boolean转换成Number 然后是 Number == AnyType去比较
*       4、String||Number||Symbol == Object => 调用ToPrimitive(Object) 再进行==比较
*       5、其他返回false
*   其中ToPrimitive(Object)
*       1、如果Object是Date，那么会转化成string类型=>调用toString，如果toString返回值不是原始类型，再调用valueOf转一下，再不行就抛异常
*       2、其他的转换成Number=>调用valueOf方法，如果valueOf返回值不是原始类型，则再调用toString转一下，再不行就抛异常
*
* 总结
* 1、两个Object，若引用的不是一个内存地址；不论怎么比较都是返回false；
* 2、基本类型和对象比较，会先将对象转换成原始类型，此时除了Date类型外，都先调用valueOf
* 3、基本类型和基本类型比较，若其中有一个是Number那么会将另一个也转换成Number进行比较
* 4、类似在java中判断一个对象是不是null的时候，x == null,但js里面除了null还有undefined;
*    但通过规定可以看出来，x == null 等同于 x === null || x === undefined
* 5、null除了和undefined以及本身比较之外，其他的都返回false
*
*
* */
// [10]是对象，调用valueOf方法转换成原始类型，valueOf返回本身
// 再调用toString，返回'10';那就是 '10' == 10, '10'会转换成数字10，相等
console.log("[10] == 10 :",[10] == 10);                 //true
// '10' => 10 然后 10 == 10 true
console.log("'10' == 10 :",'10' == 10);                 //true
// [] => valueOf => [] => toString => '' => toNumber => 0
console.log("[] == 0 :",[] == 0);                       //true
// true => toNumber => 1
console.log("true == 1 :",true == 1);                   //true
// [] => valueOf => [] => toStrong => '' => toNumber =>0
// false => toNumber => 0
console.log("[] == false :",[] == false);               //true
// [] => toBoolean => true ,取反就是false
console.log("![] == false :",![] == false);             //true
// '' => toNumber => 0
console.log("'' == 0 :",'' == 0);                       //true
// false => toNumber => 0
// '' => toNumber => 0
console.log("'' == false :",'' == false);               //true
// null和除了null或者undefined之外的任何类型比较都是false
console.log("null == false :",null == false);           //false
// null和除了null或者undefined之外的任何类型比较都是false
console.log("null == undefined :",null == undefined);   //true
// null => toBoolean => false
console.log("!null == true :",!null == true);           //true
