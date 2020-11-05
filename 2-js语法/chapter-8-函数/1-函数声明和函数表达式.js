/*
    * 总结
    * 1、函数声明和函数表达式
    *       函数声明会进行函数声明提升，可以先调用，后声明；
    *       function a(){};
    *
    *       函数表达式不行
    *       var b = function(){};
    *
    * 2、函数中的arguments参数
    *       它代表的是调用该函数时传入的参数，可以通过arguments[0]来访问；
    *       不论定义时签名上声明了几个参数，调用的时候都可以传任意多个
    *       它还有一个属性callee，代表当前的函数，可以用来递归调用当前函数，避免使用函数名耦合
    *       callee有一个caller，代表调用当前函数的'人'
    *       callee在严格模式下会有异常
    * 
    * 3、函数中的this
    *       和java里面类似，都是代表当前的实例对象；若当前函数运行在实例a的环，那么this = a;
    * 
    * 4、apply和call
    *       这两个方法和java中的反射类似Method.invoke(obj,arg...);
    *       都是在指定实例上调用该函数，但apply/call方法的使用不必目标对象拥有该方法
    * 
    * 5、bind
    *       就是给一个函数绑定一个执行环境，然后返回这个新的函数，对原函数没有影响。
    *       这样再调用这个新函数的时候，它的执行环境就在绑定的对象中了。
    * 
    * 6、函数可以作为参数，也就是回调函数
    * 
    * 7、函数可以作为返回值
    * 
    * 8、函数没有重载，声明的会把先声明的覆盖掉
    *
    *
    * */

    
/**************************创建函数********************************************/
// 1.使用构造函数创建函数的方式是最为低效的
const sum = new Function('a','b','return a+b')
console.log(sum(2,3));


// 2.函数声明， 可以声明一个函数，此时，会进行函数声明提升，即可以在位置上先调用，后声明
sum(1, 2);
function sum (num1, num2) {
    return num1 + num2;
}


// 3.函数表达式，不能先调用后声明，这样会有问题。
// 因为我觉得这是相当于变量声明，
var dcSum = function (num1, num2) {
    return num1 + num2;
};
var otherSum = dcSum;
otherSum(1, 2);

// 函数声明和函数构造器之间的区别
// 函数构造器创建的函数，只能访问全局变量
var  x = 2;
function createFun(){
    var x = 1;
    return new Function('return x;')
}
function createFun2(){
    var x = 1
    return function(){
        return x;
    }
}

var f1 = createFun();
console.log(f1()); // 2

var f2 = createFun2();
console.log(f2()); // 1


/********************************this属性**************************************************/
// 在函数中使用this属性和java里面的类似，java中的this代表的是当前实例对象，而在js里也差不多
// 如果在全局环境中定义的函数里调用this，那么this = window
// 如果在一个实例的方法中调用this，那么this = 当前实例对象
var tis = 'window';
function tisFun () {
    console.info("在函数中调用this:%s", this.tis);
}
tisFun();
var obj = {
    tis: 'obj'
};
obj.tisFun = tisFun;
obj.tisFun();


/********************************arguments参数**************************************************/
// arguments 代表调用者传递给这个函数的参数
// ECMAScript函数不介意传递进来多少个参数，也不在乎传进来的参数是什么数据类型。
// 即使签名中定义了接受两个，那传递的时候也可以传N个。
function diff () {
    return Number(arguments[0]) - Number(arguments[1]);
}
// 没有重载，这里会把上面的复写掉
function diff (a, b) {
}
console.info("演示函数重载,定义两个同名的函数，会覆盖：", diff(1, 2));

/********************************arguments.callee：严格模式报错**************************************************/
// arguments对象还有一个特殊的属性叫做callee，代表的是当前函数
// 阶乘函数
function fac (num) {
    // 由于fac是一个变量名，不像是java里面的方法名，一经定义就不能变，这里可以变的
    // 如果将函数名耦合在算法里面，那么fac的指向一旦改变，就会出问题了
    return num <= 1 ? 1 : num * fac(num - 1);
}

function newFac (num) {
    // 这样定义就避免了耦合函数名的弊端
    return num <= 1 ? 1 : num * arguments.callee(num - 1);
}

/********************************arguments.callee.caller：严格模式报错**************************************************/
// 之前在java里面一直都想获取当前函数调用者的信息，一般也只能通过线程堆栈来拿到
// 这里可以通过属性获取
caller();
function caller () {
    callee();
}
function callee () {
    console.info("是谁调用了我？ ===》", arguments.callee.caller);
}




/********************************call() apply()->Java中的反射？**************************************************/
// java里面的Method.invoke(targetObj,args...) 跟这个差不多的意思，都是在目标对象上调用该函数
// 但区别在于，java中要这样搞targetObj里面必须要有这个方法，而js里就不需要了
// 目的就是变更method的运行环境
var env = 'window';
var targetObj = {
    env: 'targetObj'
};
function invoke () {
    console.info("使用apply/call调用invoke方法，当前运行环境是:%s", this.env);
}
// apply和call差不多，区别就在于参数的传递
// apply传递数组或者arguments
invoke.apply(this);
invoke.apply(global);
invoke.apply(targetObj);
// call必须单个单个的传递
invoke.call(targetObj);


/********************************bind() 绑定函数的执行环境**************************************************/
// 上面的类反射方法，都是在某个环境中执行一次这个函数
// 而bind方法则是，生成一个新的函数，其中算法和原函数一样，但环境却被改变。

function bindInvoke () {
    console.info("使用bind绑定函数的运行环境，当前运行环境是:%s", this.env);
}
var bindEnv = {
    env: 'bind'
};
// 给原函数绑定一个新的运行环境，并返回这个新的函数
var bindFun = bindInvoke.bind(bindEnv);
// 可以直接在全局环境中调用，但函数中的this却被改变了
bindFun();



/***********************************使用函数作为参数-回调函数****************************************************/
function callSomeFunction (fun, arg) {
    return fun(arg);
}
function myfun (arg) {
    return "经过回调处理的参数" + arg;
}
callSomeFunction(myfun, "6666");
callSomeFunction((arg) => { return "lambda表达式：" + arg }, "777")

/***********************************使用函数作为返回值****************************************************/

const arr = [
    {
        name: 'zhangsan',
        age: 11
    },
    {
        name: 'lisi',
        age: 66
    },
    {
        name: 'wangwu',
        age: 4
    }
];
// 创建一个比较函数，用于数组sort
function createComparisionFunction (prop) {
    return function (obj1, obj2) {
        var value1 = obj1[prop];
        var value2 = obj2[prop];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
}
arr.sort(createComparisionFunction('age'));