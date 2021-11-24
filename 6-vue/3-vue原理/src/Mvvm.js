import {Publisher} from './Publisher.js';
import {Compile} from './Compile.js';
import {Subscriber} from './Subscriber.js';
class Mvvm{
  constructor({data={},el='',methods={},computed={},watch={}}){
    this.$data = data;
    this.$methods = methods;
    this.$computed = computed;
    // 把data挂在vm身上，并代理
    this._proxyData();
    // 把计算属性挂在vm身上
     this._proxyComputed();
    // 解析编译模板
    new Compile(el,this,new Publisher(this.$data));
    // 初始化watch
    Object.keys(watch).forEach(key => {
      let fun = watch[key];
      if(typeof fun === 'function'){
        new Subscriber(this,key,fun.bind(this));
      }
    })
  }

  $watch(exp,cb){
    if(typeof cb === 'function'){
      new Subscriber(this,exp,cb.bind(this));
    }
  }

  _proxyComputed(){
    Object.keys(this.$computed).forEach(key => {
      let comp = this.$computed[key];
      let fun = null;
      if(typeof comp === 'function'){
        fun = comp.bind(this);
      }
      Object.defineProperty(this,key,{
        configurable:false,
        enumerable: true,
        get(){
          return fun ? fun() : 'no value!';
        },
        set(v){}
      })
    })
  }

  _proxyData(){
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this,key,{
        enumerable:true,
        configurable: false,
        get(){
          return this.$data[key];
        },
        set(v){
          // 设置在vm身上的数据，都转移到data上
          this.$data[key] = v;
        }
      })
    })
  }
}
export {
  Mvvm
}