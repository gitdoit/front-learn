/**
 * IIFE:立即函数调用
 * 作用：数据是私有的，只能通过向外暴露的方法进行修改；
 */
(function(window,$){
  let data =  'IIFE私有数据。。。'
  
  // 内部函数
  function print(){
    console.log('IIFE方法，通过闭包的方式访问内部数据:'+data);
  }
  // 暴露出去的方法来改变私有数据
  function update(value){
    data = value;
  }
  // 依赖其他模块的话，就让他当作参数传入进来
  function changeBackgroundColor(){
    $('body').css('background','red')
  }
  // 暴露出去
  window.myModule = {print,update,changeBackgroundColor};
})(window,jQuery)