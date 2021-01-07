/*
    * 总结
    * 1、函数声明和函数表达式
    *       函数声明会进行函数声明提升，可以先调用，后声明；
    *       function a(){};
    *
    *       函数表达式不行
    *       var b = function [可选的函数名] (){};
    * 
    * 2、ES6在字面量对象中定义的函数可以简写
    *   {
    *       name:'123',
    *       jump(){}// 简写的函数定义
    *   }
    * 
    * 8、函数没有重载，声明的会把先声明的覆盖掉
    *
    *
    * */

    
/**************************1、函数构造器********************************************/
// 使用构造函数创建函数的方式是最为低效的
const sum = new Function('a','b','return a+b')
console.log(sum(2,3));

// 函数构造器只能访问全局变量
var  x = 2;
function createFun(){
    var x = 1;
    return new Function('return x;')
}


    
/**************************2、函数声明********************************************/
/**
 * 1.函数声明， 可以声明一个函数，此时，会进行函数声明提升，即可以在位置上先调用，后声明
 */
sum(1, 2);
function sum (num1, num2) {
    return num1 + num2;
}

/**
 * 2、有条件的创建函数
 * 不应该这样做，这样在不同浏览器中的行为不一样
 */
//foo() 报错
if(false){
    function foo(){
      console.log('有条件的创建函数');
    }
}

/**************************3、函数表达式********************************************/
/**
 * let function_expression = function [name]([param1[, param2[, ..., paramN]]]) { statements };
 * 函数声明和函数表达式非常类似，最主要的区别是函数表达式的函数名称可以省略
 * 其次是函数表达式不能先调用后声明
 */

// 标准版函数表达式，包含了函数名称，并将函数赋值给了一个变量
let funHasName = function funName(){
    // do somthing
}
// 省略了函数名称的函数表达式
let funNoName = function(){
    // do somthing
}


// 函数表达式，不能先调用后声明
// dcSum(1, 2); 报错
var dcSum = function (num1, num2) {
    return num1 + num2;
};



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