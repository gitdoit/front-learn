import { Subscriber } from './Subscriber.js';
class Compile{
  constructor(el,vm,publisher){
    this.$el = document.querySelector(el);
    this.$vm = vm;
    this.$publisher = publisher;
    if(this.$el){
      // 转换节点
      this.$fragment = this.node2Fragment(this.$el);
      // 解析
      this.compile(this.$fragment);
      // 插回去
      this.$el.appendChild(this.$fragment);
    }
  }

  /**
   * 将node节点转换成fragment片段
   * 降低渲染真实node带来的性能损失
   * @param {s} node 
   */
  node2Fragment(node){
    let fragment = document.createDocumentFragment();
    let child = null;
    while(child = node.firstChild){
      fragment.appendChild(child);
    }
    return fragment;
  }
  /**
   * 解析html模板
   * @param {s} el 
   */
  compile(el){
    let childNodes = el.childNodes;
     // 解析{{msg}}占位符
    let reg = /\{\{(.*)\}\}/;
    Array.prototype.slice.call(childNodes).forEach(node => {
      let text = node.textContent;
      if(this.isElementNode(node)){
        // 编译元素节点
         this.compileElementNode(node);
      } else if(this.isTextNode(node) && reg.test(text)){
        // 编译包含占位符的文本节点
        this.compileTextNode(node,RegExp.$1.trim());
      }
      // 继续递归子节点
      if(node.hasChildNodes()){
        this.compile(node);
      }
    })
  }
  
  /**
   * 编译元素节点
   * @param {Element} elementNode 
   */
  compileElementNode(elementNode){
    // 读取属性
    if(elementNode.hasAttributes()){
      Array.prototype.slice.call(elementNode.attributes).forEach(attr => {
        let name = attr.name;
        // 事件指令
        if(name.startsWith('v-on:')){
          let dir = name.split(':')[1];
          if(dir === 'click'){
            // 给这个节点添加一个点击事件
            let fun = this.$vm.$methods[attr.value]
            if(typeof fun === 'function'){
              elementNode.addEventListener('click',fun.bind(this.$vm));
            }
          }
        }else if(name.startsWith('v-model')){
          let value = elementNode.value =  this._getVmValue(attr.value) || '';
          // 订阅这个属性
          new Subscriber(this.$vm,attr.value,(newValue) => {
            if(value === newValue){
              return;
            }
            elementNode.value = value = newValue;
          });
          // 给input输入框注册一个oninput事件
          elementNode.addEventListener('input',(event) => {
            let newValue = event.target.value;
            if(value === newValue){
              return ;
            }
            this._setVmValue(attr.value,newValue);
            value = newValue;
          })
          
        }
      })
    }
    // TODO
  }
  /**
   * 编译文本节点
   * @param {Text} textNode 
   */
  compileTextNode(textNode,exp){
    // 从vm上取值，绑定到这个textNode上
    // 将表达式转换为函数
    let value = this._getVmValue(exp);
    textNode.textContent = typeof value == 'undefined' ? '' : value;
    // 注册一个监听器，在数据发生变化的时候调用回调函数更新文本
    new Subscriber(this.$vm,exp,(newValue,oldValue) => {
      textNode.textContent = newValue;
    });
  }

  _getVmValue(exp){
    let part = exp.split('.');
    let data = this.$vm;
    part.forEach(key => {
      data = data[key];
    })
    return data;
  }
  _setVmValue(exp,value){
    let part = exp.split('.');
    let data = this.$vm;
    for(let i = 0; i < part.length; i++ ){
      if(i+1===part.length){
        data[part[i]] = value;
      }else {
        data = data[part[i]];
      }
    }
  }

  /**
   * 是否为ElementNode节点
   * @param {*} node 
   */
  isElementNode(node) {
    return node.nodeType == 1;
  }

  /**
   * 是否为文本节点
   * @param {*} node 
   */
  isTextNode(node) {
    return node.nodeType == 3;
  }
}

export {
  Compile
}