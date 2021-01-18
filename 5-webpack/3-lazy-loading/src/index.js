console.log('index.js文件被加载了...');
// 懒加载，只有点了这个按钮才会去加载
document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'print', webpackPrefetch: true */'./print').then((module) => {
    module.default();
  });
}