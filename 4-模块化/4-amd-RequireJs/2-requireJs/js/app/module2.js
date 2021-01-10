// 依赖模块1，在一个个参数中指定所依赖的模块，第二个函数参数中传入的就是对应的依赖
define(['dataService','jquery'],function(dataService,$){
  let name = dataService.getName();
  let showMsg = function(){
    console.log(name);
  }


  let bindEvent = function(){
    let flag = true;
    // 使用jQuery
    $('#btn').click((event) => {
      $('body').css('background', flag ? 'red' : 'blue');
      flag = !flag;
    })
  }
  
  return {showMsg,bindEvent}
});