(function(window){
  let name = 'dataSerive';
  let getName = function(){
    return name;
  }
  // 暴露出去
  window.dataService = {getName}
})(window)