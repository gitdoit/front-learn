/**
属性访问器
   通过属性访问器定义的属性本身不存值，它依赖于其他属性做计算，同时它本身也可以相当于一个普通属性来使用
   
 * 属性访问器
 *  {
 *    get: [Function: get] { [length]: 0, [name]: 'get' },
 *    set: [Function: set] { [length]: 1, [name]: 'set' },
 *    enumerable: true,
 *    configurable: true
 *  }
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
 * 2、属性访问器配置方式不能存值，只有在get/set方法中做逻辑操作
 *    例如属性A配置的是属性访问器，这个A属性本身没有地方存值，你调用obj.A=2
 *    的时候它只能在内部操作其他属性，不能在set函数中使用this.A=2，不然死循环；
 *
 *
 * **/


// 1、使用API的方式定义访问器
let person = {
    _age: 18,
    name: 'Michael',
    height: 178
};
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
console.log(person.height);// 179


// 3、ES5使用关键字来创建属性访问器
let es6 = {
    _name:'shuaige',
    get name(){
        return this._name +' is me!';
    },
    set name(value){
        this._name = value
    }
}

console.log(es6.name);
es6.name = 'meinv';
console.log(es6.name);
console.log(Object.getOwnPropertyDescriptor(es6,'name'));


// 2、属性访问器的特性
/**
 * {
    get: [Function: get] { [length]: 0, [name]: 'get' },
    set: [Function: set] { [length]: 1, [name]: 'set' },
    enumerable: true,
    configurable: true
    }
 */
let _ageDescriptor = Object.getOwnPropertyDescriptor(person, 'age');
console.info("读取属性 _age 的特性：%o", _ageDescriptor);



