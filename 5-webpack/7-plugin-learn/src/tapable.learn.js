const {
  // eslint-disable-next-line no-unused-vars
  SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook,
} = require('tapable');

/**
 * https://juejin.cn/post/6844904037624578061
 * 上面哪些个引入，就我目前开来就相当于一个不同类型【事件监听者容器】
 * 作用在于事件发生时，如何调用这些事件监听者：是同步还是异步等
 */
class HookDemo {
  constructor() {
    this.hooks = {
      go: new SyncHook(['address']),
      stop: new SyncBailHook(['reson']),
      fly: new AsyncParallelHook(['height', 'speed']),
      jump: new AsyncSeriesHook(['name']),
    };
  }

  /**
   * 注册钩子
   */
  registHooks() {
    /* ====在SyncHook上注册同步执行的钩子，并且钩子没有返回值==== */
    this.hooks.go.tap('first', (param) => {
      console.log('SyncHook-first', param);
    });
    this.hooks.go.tap('second', (param) => {
      console.log('SyncHook-second', param);
    });
    /* ==== 在SyncBailHook上注册同步执行的钩子，可以有返回值，如果某个钩子出现了返回值，后面的钩子不会执行 ==== */
    this.hooks.stop.tap('1-bail', (param) => {
      console.log('SyncBailHook-first', param);
      // 这将会导致下面那个钩子不执行,经测试，靠谱
      return 'some value';
    });
    this.hooks.stop.tap('2-bail', (param) => {
      console.log('SyncBailHook-second', param);
    });
    /* ==== 在AsyncParallelHook上注册异步钩子 === */
    this.hooks.fly.tapAsync('1-asyncParall', (height, speed, cb) => {
      setTimeout(() => {
        console.log(`AsyncParallelHook-first,height[${height}] speed[${speed}]`);
        cb();
      }, 1000);
    });
    this.hooks.fly.tapPromise('2-asyncParall', (height, speed) => new Promise((reslove) => {
      setTimeout(() => {
        console.log(`AsyncParallelHook-second,height[${height}] speed[${speed}]`);
        // 除了用tapAsync方法注册，还能用tapPromise
        // 这个方法不需要回调函数，需要返回Promise
        reslove();
      }, 500);
    }));

    /* ==== 在AsyncSeriesHook上注册异步串行钩子，这个和同步有什么区别？耗时不都是 hook1耗时+hook2耗时... */
    this.hooks.jump.tapAsync('1-AsyncSeriesHook', (name, cb) => {
      setTimeout(() => {
        console.log(`AsyncSeriesHook-first,name[${name}] `);
        cb();
      }, 1000);
    });
    this.hooks.jump.tapPromise('2-AsyncSeriesHook', (name) => new Promise((reslove) => {
      setTimeout(() => {
        console.log(`AsyncSeriesHook-second,name[${name}] `);
        reslove();
      }, 500);
    }));
  }

  // 调用同步无返回值的钩子
  emmitGoEvent(address) {
    this.hooks.go.call(address);
  }

  // 调用同步可以有返回值的钩子
  emmitStopEvent(param) {
    this.hooks.stop.call(param);
  }

  // 调用异步并行的钩子
  emmitFlyEvent(height, speed) {
    this.hooks.fly.callAsync(height, speed, () => {
      console.log('AsyncParallelHook：所有的钩子都执行完毕了！');
    });
  }

  // 调用异步串行钩子
  emmitJumpEvent(name) {
    this.hooks.jump.callAsync(name, () => {
      console.log('AsyncSeriesHook：所有的钩子都执行完毕了！');
    });
  }
}

const hookDemo = new HookDemo();
// 先注册
hookDemo.registHooks();

hookDemo.emmitGoEvent('some value');
// hookDemo.emmitStopEvent('stop the fucking car!!');
// hookDemo.emmitFlyEvent(15000, 500);
// hookDemo.emmitJumpEvent(15000, 500);
