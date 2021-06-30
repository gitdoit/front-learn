
/**
 * 注册中心，注册监听器
 */
class Registry{
  static _idCount = 0;
  // 当前依赖,即Subscriber实例
  static CURRENT_CALLER = null;
  constructor(){
    this.id = Registry._idCount++;
    this.subscribers = []
  }
  /**
   * 收集依赖
   */
  depend(){
    Registry.CURRENT_CALLER.registerOn(this);
  }

  /**
   * 注册事件监听器
   * @param {s} subscriber 
   */
  register(subscriber){
    this.subscribers.push(subscriber);
  }
  /**
   * 发布监听器感兴趣的事件
   */
  notify(){
    this.subscribers.forEach(subscriber => {
      subscriber.update();
    })
  }
}

/**
 * 事件发布者
 */
class Publisher{
  constructor(data){
    this.data = data;
    this.observe(data);
  }
  /**
   * 监视数据
   * @param {s} data 
   * @param {*} prefix 
   */
  observe(data){
    Object.keys(data).forEach(key => {
      let value = data[key];
      // 每个key对应的都有一组订阅
      // registry维护这些订阅
      let registry = new Registry();
      Object.defineProperty(data,key,{
        get(){
          // Subscriber主动调用的话会触发
          if(Registry.CURRENT_CALLER){
            // 将这个Subscriber收集到当前属性的注册中心
            registry.depend();
          }
          return value;
        },
        set(v){
          if(v === value){
            return;
          }
          value = v;
          registry.notify();
        }
      });
      // 递归代理
      if(typeof value === 'object'){
        observe(data[key]);
      }
    })
  }
  
}


export {
  Publisher,
  Registry
}