module.exports = function (content) {
  console.log('这是一个异步loader，在打印这句话的2秒之后，后面的loader才会执行。但是期间webpack可以做其他事情');
  // 开启异步，让webpack去执行其他事情
  const callback = this.async();
  // 模拟对content做一些事情
  setTimeout(() => {
    // 做完之后调用回调方法，让下一个Loader继续处理
    callback(null, content);
  }, 2000);
};
