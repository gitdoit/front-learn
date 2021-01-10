(function(window,dataService){
  let showName =  function(){
    console.log('print():'+dataService.getName());
  }
  // 暴露出去
  window.printer = {showName};
})(window,dataService);