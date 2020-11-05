/**
    * ECMA-262把对象定义为：无序属性的集合，其属性可以包含基本值、对象或者函数；
    * 由于js里面没有类的概念，所以我的理解就是这里的对象更像是Map，就是一些无序键值对集合
    * 1、数据属性
    *   对象中的每个属性，在js里面都可以从下面几个维度进行描述
    *   1、[[Configurable]] 表示能否通过delete删除属性，从而从新定义属性，能否修改属性的特性
    *       或者能否把属性修改为访问器属性。默认为true
    *   2、[[Enumerable]]: 表示能否通过for-in遍历到该属性，默认为true
    *   3、[[Writable]]: 表示能否修改当前属性的值，默认true
    *   4、[[value]]: 这里存储这个属性的值，当然默认是undefined
    * 
    * 2.属性访问器
    *    通过属性访问器定义的属性本身不存值，它依赖于其他属性做计算，同时它本身也可以相当于一个普通属性来使用
    * 
    *    定义方式：Object.defineProperty(anEntity,'propName',{configurable:true,enumerable:true,get(){..},set(v){...}})
    *    属性访问器配置的属性也相当于对象中的一个普通属性，可以通过 anEntity.propName 来读取或者赋值
    *    其中的get/set方法和java里面的类似，但是使用方式可不是像anEntity.getPropName()/anEntity.setPropName()
    *    我们直接调用 anEntity.propName就相当于访问了它的get方法，调用anEntity.propName(value)就相当于访问了set方法
    *    
    * 
    * 
    * */

var person = {
    /*默认情况下描述这个属性的是否可配置、是否可枚举、是否可写都是true；这里也一样，[[value]]被设置成了Michale
    * 对name值的任何修改，都反映在[[value]]上
    * */
    name: 'Michael'
};

// 为一个对象定义一个属性，这个属性不可写，初始值是jean
// 这效果是不是像java里的final
person = {};
Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'Jean'
});
// person.name => Jean
person.name = 'LanBiuBiu';
// person.name => Jean , 由于configurable=false，所以赋值无效
// 一旦把对象中的某个属性设置为 configurable:false 就代表这个对象不可删除，不可配置(即不能改变该属性的特性了,Writable除外)
// 而且这种改变是单向的，一旦变为false，就不能改回来了

/**
 * 属性访问器
 * configurable: true,
 * writable: true,
 * get() {},
 * set(v) {}
 *
 * 数据属性和属性访问器有什么区别和联系？
 * configurable\enumerable和数据属性一样
 * 1、同一个属性，不能即配置数据属性、又配置属性访问器。
 *    为什么属性配置方式既有数据属性又有属性访问器两种方式？
 *      结合需要，如某个属性是根据其他属性计算得来的，那么可以使用属性访问器；
 *      否则只需要简单的数据属性就行。
 *    那为什么不能同时配置？
 *      如果即配置了数据属性又配置了属性访问器，拿在读取数据的时候是访问get呢还是直接
 *      读取数据本身呢？
 *
 *
 * 2、属性访问器配置方式不能存值，只有在get/set方法中做逻辑操作
 *    例如属性A配置的是属性访问器，这个A属性本身没有地方存值，你调用obj.A=2
 *    的时候它只能在内部操作其他属性，不能在set函数中使用this.A=2，不然死循环；
 *
 *
 * **/
// 属性访问器就相当于java里的getter和setter，不过不能简单的理解为它就是一个函数而已，
// 也有额外的特性描述这个属性访问器
person = {
    _age: 18,
    name: 'Michael',
    height: 178
};

// 定义访问器
Object.defineProperty(person, 'age', {
    configurable: true,
    enumerable: true,
    get () {
        return this._age;
    },
    set (v) {
        // 这里的逻辑不跟你多逼逼
        this.height += v - this._age;
        this._age = v;
    }
});
// 给age赋值，会调用到上面定义的set(v)方法，执行里面的逻辑
person.age = 19;
// 导致height也会变
//person.height => 179;


/********************************同时定义多个属性，有坑：它的特性默认不再是true了，全是false**********************************************************/
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
/************************************属性访问器********************************************************/
let nameyDescriptor = Object.getOwnPropertyDescriptor(book, 'name');
let _ageDescriptor = Object.getOwnPropertyDescriptor(book, '_age');
console.info("读取属性 name 的特性：%o", nameyDescriptor);
console.info("读取属性 _age 的特性：%o", _ageDescriptor);