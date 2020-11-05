/**
     *   JS主要通过原型链实现继承，即将父类的实例引用赋给子类的原型，这样子类就能拥有
     * 父类的方法和属性。但对于引用属性来说所有子类实例都用一个，肯定不行，所以这种方式
     * 一般不会单独使用，从而出现了借用构造函数的技术，即在子类构造函数中调用父类构造函数的逻辑
     * 这样子类每个实例都有一份单独的属性了。
     *
     * 借用构造函数：在子类构造函数中执行一遍父类构造函数的逻辑
     * 组合式继承：借用构造函数+原型链(Son.prototype = new Father())
     * 原型式继承：浅拷贝，父类实例浅拷贝一份返回值就是子类实例。
     * 寄生式继承：浅拷贝+工厂方法
     * 寄生组合式继承：同名
     *
     *
     *
     * */



/***********************************继承******************************************************/

// 父构造函数，拥有一个成员属性和一个原型方法
function Father () {
    this.fatherName = '我是父亲！';
    this.arr = [1, 2, 3];
    if (typeof this.getFatherName !== 'function') {
        Father.prototype.getFatherName = function () {
            return this.fatherName;
        }
    }
}
// 子构造函数，有一个成员属性
function Son () {
    this.sonName = '我是儿子！';
}
// 将原型指向父构造函数实例
Son.prototype = new Father();
// 在该原型上(实际上是父类的实例，不是父类的原型)加一个方法
Son.prototype.getSonName = function () {
    return this.sonName;
};
let son = new Son();
// 会继承父类的原型方法
console.info(son.getFatherName());
// 还会继承父类的成员变量，实际上这个变量是来自于Son的原型(也就是Father的实例上的)，并不在它自己身上，
console.info(son.fatherName);
console.info(son.getSonName());

/***********************************确定原型和实例的关系******************************************************/
// 只要构造函数出现在原型链上过，就都可以
console.info("son instanceof Son", son instanceof Son);
console.info("son instanceof Father", son instanceof Father);
console.info("son instanceof Object", son instanceof Object);


/***********************************覆盖方法******************************************************/
// 在Java里面复写一个方法，只要提供一个相同签名的方法就行了，这里也差不多
// 由于原型链搜索机制，所以可以在两个地方重写父类的方法
// 在子类实例上复写、在子类原型上复写。优先级当然是子类实例了
son.getFatherName = function () {
    return "在儿子的实例上复写了父类原型上定义的方法！";
};
Son.prototype.getFatherName = function () {
    return "在儿子的原型上复写了父类原型上定义的方法"
};
console.info(son.getFatherName());
/***********************************原型链的问题:子类实例共用原型上的引用对象******************************************************/
// 看见没有，这就是问题；所有子类实例，公用原型中的属性
// 也就是说没办法像java那样，从父类中继承成员变量。
son.arr.push(222);
var son2 = new Son();
console.info("大儿子改变了原型链上的数组，二儿子呢? =>%o", son2.arr);





/************************************************************************************************************/
/*********************************五种常用继承方式及优缺点*****************************************************/
/************************************************************************************************************/


/********************************1、借用构造函数->在子类中将父类构造函数逻辑执行一遍********************************************/
/**
 * 借用构造函数的方式是相当于将父类构造函数中的逻辑在子类环境下都执行了一遍
 * 优点： 这样每个子类的实例都有自己独立的属性
 * 缺点：方法会生成多份，不共用。
 * */
function F () {
    this.name = '12';
    this.arr = [1, 2, 3];
    this.sayHi = function () {
        console.info("hi~")
    }
}
function S () {
    // 也就相当于在S的环境下执行了一遍F，把F里的赋值操作赋到S的实例里。
    // 但是没屌用，方法都定义在构造函数里，还是会生成很多个方法实例，这不优美~
    F.call(this);
}
var s1 = new S();
var s2 = new S();
s1.arr.push(4, 4, 4);
console.info(s2.arr);

/***********************************组合继承(最常用的)******************************************************/
/**
 * 最理想的方式
 * 组合继承=借用构造函数+原型链
 * 优点：公共方法定义在父类原型上，可以公用，且还拥有借用构造函数的独立属性的优点。
 * 缺点：父类构造方法被执行两遍，生成不可见的属性，内存浪费。
 *
 * */
function A (name) {
    this.name = name;
    this.arr = [1, 2, 3];
    if (typeof this.syaName !== 'function') {
        A.prototype.sayName = function () {
            console.info(this.name);
        }
    }
}
function B (name, age) {
    // 继承属性
    A.call(this, name);
    this.age = age;
}
// 继承A里的方法，但是这样不会多出来两个没用的属性name和arr吗？虽然访问不到，但是浪费内存？
B.prototype = new A();
B.prototype.syaAge = function () {
    console.info(this.age);
};
var b1 = new B("张三", 22);
var b2 = new B("李四", 44);

b1.arr.push(55);
b2.arr.push(66);

console.info(b1.arr);
console.info("属性不再公用");
console.info(b2.arr);

/***********************************原型模式******************************************************/
/**
 * 必须有一个对象作为另一个对象的基础，在这个对象上做扩展。
 * 优点：就相当于浅拷贝，可以在这个副本上加新方法
 * 缺点：浅拷贝有什么缺点，这就有什么
 *
 * */
// 就是在指定的对象基础上创建新的对象,但它们的引用属性还是共享的
function object (source) {
    function F () { }
    // 懂我意思吗？
    F.prototype = source;
    return new F();
}
var h = {
    name: "h1",
    arr: [1, 2, 3]
};
var h1 = object(h);
h1.arr.push(4);
console.info(h.arr);

//ECMAScript 5 通过新增 Object.create()方法规范化了原型式继承。这个方法接收两个参数：一
//个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。
var h2 = Object.create(h);
// 效果跟自己定义的一样
console.info(h2.arr);

/***********************************寄生式继承******************************************************/
/**
 * 寄生式继承=工厂模式+原型模式，不过是在原型模式中添加了赋公共方法的操作。
 * 优点：比原型模式多了一个公共方法赋值
 * 缺点：公共方法每个实例中都有一份，没法复用
 *
 * */
// 和寄生构造函数+工厂模式类似
function createAnother (original) {
    var clone = Object.create(original);
    // 为original扩展了一个sayHi函数，但是无法函数复用
    clone.sayHi = function () {
        console.info("hi!")
    };
    return clone;
}
var people = {
    name: "name",
    age: 11
};
var man = createAnother(people);
man.sayHi();

/********************************************寄生组合式继承***********************************************/
/**
 * 寄生组合式继承= 寄生式继承+组合式继承
 * 寄生式继承会造成父类方法实例不公用。组合式继承会造成父类构造函数执行两边。
 * 但他俩组合起来就能相互弥补对方的不足。
 *
 * 优点：函数公用，属性独立
 * 缺点：复杂？
 *
 * */
function inheritPrototype (subType, superType) {
    // 拿到父类原型的副本，所以不会执行父类的构造方法
    var prototype = Object.create(superType.prototype);
    // 构造函数引用指向子类构造函数
    prototype.constructor = subType;
    // 子类原型指向父类原型的副本
    subType.prototype = prototype;
}

var Super = function (name) {
    this.name = name;
    this.arr = [1, 2, 3];
    if (typeof this.sayName !== 'function') {
        Super.prototype.sayName = function () {
            console.info("hi!")
        }
    }
};
inheritPrototype(Sons, Super);
var Sons = function (name, age) {
    Super.call(this, name);
    this.age = age;
};
Sons.prototype.sayAge = function () {
    console.info("age!")
}