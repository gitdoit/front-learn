

/*
*
* 在使用判断的时候下面这几种类型会被转变为false，其他的都是true；
* 尤其需要注意的是 [] 转 boole的时候是true，因为他是对象
*
* */
if (undefined) {
    // undefined 转换为false
}
if (null) {
    // null 转换为false
}
if (NaN) {
    // Nan转换为false
}
if (0) {
    // 0 转换为false
}
if (-0) {
    // -0转换为false
}
if ("") {
    // 空串转换为false
}

/*
* 一般情况下对于某些收到的参数，做校验
* 希望其有值的时候才坐一些操作，那么可以根据上面的 特性，直接将其看作是一个布尔变量
* */

// 参数a是 null 或者 undefined Nan ...时不会执行
// 就不用显示的判断参数是不是null  是不是空串 是不是未定义等等
var a = null;
if (a) {
    // do something
}


