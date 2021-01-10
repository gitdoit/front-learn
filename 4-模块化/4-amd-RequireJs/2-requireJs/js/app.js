(function () {
  /**
 * 以前是把所有的模块都在页面上引入
 * 现在是只引入一个requireJs，然后在这里配置所有依赖的路径和名称就行了
 */
  requirejs.config({
    // 指定基础路径，省的下面那么多模块写很长的路径了
    // 不指定也行，你要把路径写全就可以
    baseUrl: 'js/app',
    // 将模块名和对应的文件映射起来
    paths: {
      // 这里前面的js/app路径就可以省去了
      // 并且不要加js后缀
      dataService: 'module1',
      printer: 'module2',
      // 引入第三方依赖,jquery自己支持AMD模式
      // 这里引入的名字必须是全小写的jquery，其他的不行
      jquery: '../lib/jquery-1.10.1',
    }
  });
  // 用起来
  define(['printer'], function (printer) {
    printer.showMsg();
    printer.bindEvent();
  });
})();