/**
    * ECMA-262把对象定义为：无序属性的集合，其属性可以包含基本值、对象或者函数；
    * 由于js里面没有类的概念，所以我的理解就是这里的对象更像是Map，就是一些无序键值对集合
    * 1、数据属性
    *   对象中的每个属性，除了包含名字和值以外还有下面几个特性描述这个属性；
    *   我们可以通过API来配置这些特性
    *   1、[[Configurable]] 表示能否通过delete删除属性，从而从新定义属性，能否修改属性的特性
    *       或者能否把属性修改为访问器属性。默认为true
    *   2、[[Enumerable]]: 表示能否通过for-in遍历到该属性，默认为true
    *   3、[[Writable]]: 表示能否修改当前属性的值，默认true
    *   4、[[value]]: 这里存储这个属性的值，当然默认是undefined
    * 
    * */

/**
 * 1、读取属性的特性
 *  通过Object.getOwnPropertyDescriptor来查看一个属性默认情况下的特性
 *  这个api看名字就知道只能读取自己的，还有一个是读取自己的和继承的
 * {
 *  value: 'Michael',// 就是这个属性的值
 *  writable: true, // 是否可写
 *  enumerable: true, // 是否可枚举
 *  configurable: true // 是否可配置
 * }
 */
var person = {
   name: 'Michael'
};
console.log(Object.getOwnPropertyDescriptor(person,'name'));






/**
 * 2、配置属性的特性
 */
let set = {x:1};
Object.defineProperty(set,'x',{
    value:2,
    writable:false,
    enumerable:false,
    configurable:true,
})
// 不可枚举了，返回空集合
console.log('不可枚举:Object.keys:'+Object.keys(set));
// 不可写了，再赋值就没用了，还是2
set.x = 3;
console.log('不可写:对它进行赋值3'+set.x);
// 再设置回来
Object.defineProperty(set,'x',{writable:true});
set.x = 4;
console.log('再设置为可写的再赋值：'+set.x);






/**
 * 3、改变可配置属性
 */
let conf = {x:1}
Object.defineProperty(conf,'x',{configurable:false});
// 赋值生效
conf.x = 3;
console.log(conf.x);
// 删除失效
delete conf.x
console.log(conf.x);
// 修改writable特性有效
Object.defineProperty(conf,'x',{writable:false});
conf.x = 666;
console.log(conf.x);
// 【改变】configurable、enumerable报错；意思是如果原来是true，现在又设置为true没事
// 但是原来是false，现在改为true就报错
// Object.defineProperty(conf,'x',{configurable:true});
// Object.defineProperty(conf,'x',{enumerable:false});






// 4、使用defineProperty方法给对象添加新的属性时，那几个属性默认都是false
let empty = {};
Object.defineProperty(empty,'x',{value:3});
// 3
console.log(empty.x);
// 3
empty.x = 44
console.log(empty.x);







// 5、同时定义多个属性，有坑：它的特性默认不再是true了，全是false
const book = {};
Object.defineProperties(book, {
    _age: {
        value: 18
    },
    name: {
        value: 'Michael'
    },
    height: {
        value: 178
    },
    age: {
        get () {
            return this._age;
        },
        set (v) {
            this.height += v - this._age;
            this._age = v;
        }
    }
});