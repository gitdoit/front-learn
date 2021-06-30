import {Registry} from './Publisher.js';
/**
 * 事件订阅者
 */
class Subscriber{
  constructor(vm,expOrFn,cb){
    this.vm = vm;
    this.cb = cb;
    this.expOrFn = expOrFn;
    this.registryIds = {};
    // 计算属性
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    }
    // 普通依赖 
    else {
        this.getter = this.parseGetter(expOrFn.trim());
    }
    this.value = this.get();
  }
  update(){
    // 调用回调函数
    // TODO Vue中会有一个dirty标志位，当数据发生更新时设置标志位
    // 在get()方法内检测这个标志位是否被设置，如果是则代表需要重新计算
    // 否则使用缓存值 value
    var value = this.get();
    var oldVal = this.value;
    if (value !== oldVal) {
        this.value = value;
        this.cb.call(this.vm, value, oldVal);
    }
  }

  get(){
    // 当前调用者指向自己
    Registry.CURRENT_CALLER = this;
    let value = this.getter.call(this.vm, this.vm);
    Registry.CURRENT_CALLER = null;
    return value;
  }

  /**
   * 将自己主动注册到注册中心
   * @param {s} registry 
   */
  registerOn(registry){
    // 判断是否已经在当前注册中心注册过了
    if (!this.registryIds.hasOwnProperty(registry.id)) {
      // 没有注册过，就注册
      registry.register(this);
      this.registryIds[registry.id] = registry;
    }
  }

  /**
   * 将表达式转换成为getter
   * @param {*} exp 
   */
  parseGetter(exp) {
    if (/[^\w.$]/.test(exp)) return; 
    var exps = exp.split('.');
    return function(obj) {
        for (var i = 0, len = exps.length; i < len; i++) {
            if (!obj) return;
            obj = obj[exps[i]];
        }
        return obj;
    }
  }
}
export {
  Subscriber
}