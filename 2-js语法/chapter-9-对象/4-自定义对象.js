/*
   * 总结
   * 可以通过实例访问原型上的属性，但是不能重写原型中属性的值；
   * 例如原型上有个name:'1' 在实例上修改 instance.name = '2';
   * 这样做只会在实例上添加一个name成员变量，而不是修改原型上的属性。
   * 【【但是】】如果原型上的属性是一个引用类型，例如是一个Array，那么instance.arr.push(1,2,3),就会影响了
   *
   * 1、构造函数按照约定首字母大写，通过new 关键字调用。
   * 2、构造函数中的this指的是当前创建的实例对象，【如果】按照普通函数的调用方法调用构造函数那么this就相当于当前的运行环境了，默认就是window。
   * 3、每个函数在创建的时候都有一个原型prototype属性,并且该属性指向的对象包含一个constructor属性指向当前构造函数。
   * 4、这个原型跟java中的class差不多，在原型上创建的属性或者函数，改原型实例都能访问。
   * 5、原生对象也能通过prototype来添加新的属性或者方法，但是不建议这样做，可以通过寄生构造方法来弄
   *
   * 构造函数、实例、原型对象之间的关系
   *
   * 原型中有一个constructor属性，指向构造函数
   * 构造函数有一个prototype属性指向原型对象
   * 实例有一个不可见的_proto_属性指向原型对象
   * 所以原型和构造函数相互持有对方的引用，实例有一个不可访问的_proto_属性持有对原型的引用
   *
   *
   *
   * */

/**************************构造函数模式创建对象*************************************/

/**
 * 构造函数按照约定首字母大写，调用时使用new Person(...)形式
 * 如果按照普通方法的方式去调用，那么它就是一个普通方法。
 * 
 * 
 * 通过new 关键字创建对象的4个步骤
 * 1、创建一个新对象
 * 2、将构造函数的作用域指向这个新对象，此时构造函数中的this就是这个新对象了
 * 3、执行构造函数中的代码(添加的属性就到这个新对象上了)
 * 4、返回这个新对象
 * */
function Person (name, age, job) {
    this.age = age;
    this.name = name;
    this.job = job;
    this.sayHi = function () {
        console.info("Hi~ o(*￣▽￣*)ブ");
    }
    // 屁用没有，声明了一个函数，没有赋给当前对象
    function wrong(){};
}
var p1 = new Person('Michael', 11, 'Cleaner');
var p2 = new Person('Jean', 12, 'Student');
// p1.constructor == p2.constructor => ture 是一个构造器
// p1 instanceof Person => ture 都是Person的实例
// 如果不通过new关键字来构造实例对象，适用普通的方式来调用构造函数的结果和访问一个普通的函数没有任何区别



/**************************原型模式-初见*************************************/
// 由于在js中函数也是一个对象，每次实例化对象都会产生内容相同，但不是同一个实例的函数
// 这样不好，函数中只是封装了算法，并没有状态，完全可以所有同类型的实例公用，和java一样
// 我们在java里面可以定义类变量，是所有该类的实例公用这个变量
// 而在js中也有类似的实现，就是原型: prototype

// 函数也是对象，每创建一个新函数，那么该函数就会自动获得 prototype 属性，该属性指向函数的原型对象
// 并且该原型对象获得一个 constructor 属性，该属性指向当前函数
function Pro () { }
// 将公共属性、方法，定义在原型上，那么该类型的所有实例都有该方法或属性
Pro.prototype.name = '原型';
Pro.prototype.sayHi = function () {
    console.info("来自原型的方法!!");
};
var pp = new Pro();

// 虽然实例pp没有任何方法和属性，但是它的原型上有，所以可以调用
// 访问规则是先看自己身上有没有，没有去原型上找；屏蔽规则也跟其他的一样，若自己的和原型的重名了，那就屏蔽原型上的
pp.sayHi();
// Pro.prototype.isPrototypeOf(pp) => true
// 获取实例的原型
var ppPro = Object.getPrototypeOf(pp);

/**************************原型模式-这个属性来自哪？*************************************/
// 总结，in 关键字能够判断这个属性能不能通过这个实例来访问到，不管他是属于原型还是实例
function FromWhere () { }
FromWhere.prototype.addr = '我来自原型';
var fw = new FromWhere();

// fw.hasOwnProperty("addr") => false 语义是是否是私有的属性
// 'addr' in fw => true 语义是是否可以访问
fw.addr = '我来自实例';
// fw.hasOwnProperty("addr") => true


// for in 能够访问能够通过实例访问到的可枚举的属性
for (var att in pp) {
    console.info(att);
    console.info(typeof att)
}
pp['sayHi']();

/**************************原型模式-简洁的创建方式*************************************/
function SimplePrototype () {
}
// 之前每次给原型上添加一个属性都要敲一遍XXX.prototype.name = 'xxx',比较费劲；
// 由于原型也是一个对象，所以可以这样
SimplePrototype.prototype = {
    name: 'Simple',
    age: 11,
    sayHi: function () {
        console.info("我来自自己定义的prototype!")
    }
};
// 由于自己定义的，所以咱这个对象要把构造函数给指定好，不然会丢掉
// 但是默认的构造函数属性，是不可枚举的，需要手动设置一下
Object.defineProperty(SimplePrototype.prototype, 'constructor', {
    enumerable: false,
    value: SimplePrototype
});

/**************************原型模式-原型的动态性*************************************/
// 意思就是可以随时随地往原型上加属性或方法，原型的实例都能够立刻使用 这就是依赖于属性查找
// 但是下面这样可就不行了
function Dyn () {
}
var d = new Dyn();
// 这里把Dyn原型重新指向了一个新的对象，原来创建的则没有变过来
Dyn.prototype = {
    sayHi: function () {
        console.info("我后添加的！")
    }
};
Object.defineProperty(Dyn.prototype, 'constructor', {
    enumerable: false,
    value: Dyn
});
// 报错！
// d.sayHi();

/**************************原型模式-原生对象的原型*************************************/
console.info("数组的sort方法通过原型来看看:", Array.prototype.sort);
// 这特性好啊，可以自己往Array里面加方法，java就不行了
// 这样直接改原生对象并不建议
Array.prototype.jiaobaba = function () {
    console.info("爸爸！")
};
var arr = [];
arr.jiaobaba();

/**************************原型模式-正确使用方法*************************************/
function RightWay (name, age) {
    this.name = name;
    this.age = age;
    // 就像是懒汉模式一样
    // 这个没有多线程的问题
    // 如果有多个函数需要初始化，只需要判断其中一个就行了，然后一起初始化
    if (typeof this.sayHi !== 'function') {
        RightWay.prototype.syaHi = function () {
            console.info("Hi~ o(*￣▽￣*)ブ");
        }
    }
}

/**************************原型模式-寄生构造函数*************************************/
// 由于原型的存在，可以对原生对象添加函数，但是不建议这样做，有风险
// 现在可以通过下面这种方式，以类似于继承的方式来扩展原生对象
function MyArray () {
    var arr = new Array();
    arr.push.apply(arr, arguments);
    arr.myFunction = function () {
        console.info("我扩展了原生Array:%o", this);
    };
    return arr;
}
// 及扩展了原生数组，又不影响它，岂不美哉？
var arr = new MyArray(1, 2, 3, 4);
arr.myFunction();

/**************************原型模式-稳妥构建模式*************************************/
function Safe (initNumber) {
    var compute = new Object();
    compute.add = function (adder) {
        return initNumber += adder;
    };
    return compute;
}
var compute = Safe(1);
compute.add(2);
console.info(compute.add(3));