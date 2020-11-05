
/*
* undefined
* */

// "undefined"
var udf = undefined + "";
// Nan
udf = undefined + 1;
// false，当undefined被期望是一个布尔值的时候，它会转变为false
udf = undefined && true;
// 异常
udf = Object(undefined);

/*null*/

// "null"
var nul = null + "";
// 0
nul = null + 1;
// false，当null被期望是一个布尔值的时候，它会转变为false
nul = null && true;
// 异常
nul = Object(null);

/*true*/
// "true"
var t = true + "";
// 2
t = true + 1;
// 包装对象
t = Boolean(t);

/*false*/
// "false"
var f = false + "";
// 1
f = false + 1;
// 包装对象
f = Boolean(false);

/*字符串*/

// 1，空串期望转变为数字的时候会变成0
var empStr = 1 - "";
// false，当空串被期望是一个布尔值的是否，它是false
if (empStr) {
    // do something
}
//0.8 当数字字符串被期望是一个数字的时候他会转换为数字
var numStr = 13 - "12.2";
// 当一个非空串被期望是一个布尔类型的时候，它会是true
if (numStr) {
    // true
}
// 当一个非数字字符串被期望是一个数字的时候，它就是NaN
var nan = 1 - "abc";

/*数字*/
// "0" 当一个数字被期望是一个字符串的时候，他就是字符串表示数字
var num = 0 + "";

//false ，当一个数字0被期望是一个布尔值的时候，它是false
if (num) {
    //false
}
//true
if (1) {
    //true
}

/*NaN*/
    // 转变为布尔值 就是 false，字符串就是 "NaN"

/*Infinity*/
    //字符串就是字符串，布尔值就是true
