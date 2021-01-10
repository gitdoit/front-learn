let uniq = require('uniq');
let m1 = require('./module1');
let m2 = require('./module2');
let m3 = require('./module3');


/**
 * 在浏览器端使用需要用browserify来编译一下
 * 输出编译后的文件，然后再在页面中引入；
 * 1、全局安装browserify: npm install browserify -g
 * 2、局部安装，必不可少：npm install browserify --save-dev 
 * 3、编译打包：browserify js/src/app.js -o js/dist/bundle.js
 *    语法就是将目标js文件编译后输出到指定文件内：-o 就是output
 */
m1.foo();
m2();
m3.foo();
console.log('uniq去重：'+uniq(m3.arr));