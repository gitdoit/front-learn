// 导入第三方的模块,直接写包名，没有路径，写在最上面
let uniq = require('uniq');
// 导入自己的模块
let m1 = require('./modules/module1');
let m2 = require('./modules/module2');
let m3 = require('./modules/module3');

/**
 * 1、新建modules文件夹，下面写自己的模块
 * 2、npm init 初始化项目
 * 3、安装第三方依赖：npm install uniq
 * 4、使用commonjs语法导入导出模块
 * 5、node app.js运行一个文件
 */
// cmd -> node app.js

// module.exports = {foo(){}}
m1.foo();
// module.exports = function(){}
m2();
// module.foo = function(){}
m3.foo();
// 调用第三方包
console.log('uniq去重：'+uniq(m3.arr));


console.log("=========================");
console.log('module.id: ', module.id);
console.log('module.exports: ', module.exports);
console.log('module.parent: ', module.parent);
console.log('module.filename: ', module.filename);
console.log('module.loaded: ', module.loaded);
console.log('module.children: ', module.children);
console.log('module.paths: ', module.paths);