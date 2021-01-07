/**
     *
     * 私有变量
     *
     * JS对象里没有和java那样的private 修饰符，所有的属性都是对外暴露的；
     * 我们可以利用闭包的方式提供类似getter/setter方法来访问属性;
     * 即函数内部的局部变量+闭包函数。
     *
     * 这种方式，只能通过构造函数来实现，其中的函数会每个实例都一份
     * 只能实现实例变量私有，不能同时满足getter/setter函数公用的要求
     *
     * TODO 实现实例变量私有+getter/setter函数公用？？能吗？书里没有这样的例子。
     *  想一下应该不行，公用的getter/setter根据不同的实例操作不同实例的私有变量
     *  那么这个变量肯定是挂到实例上的，那么怎么挂到实例上又不能被外界直接访问呢？
     *
     * */
    function MyObject(name) {
        var editNumber = 0;
        this.setName = function (value) {
            // 不能用this.name = value
            // 因为调用这个setName方法的是其他对象
            name = value;
            editIncr();
        };
        // 这叫特权方法
        this.getName = function() {
            return name;
        };

        this.getEditNumber = function () {
          return editNumber;
        };

        // 私有函数
        function editIncr() {
            editNumber ++;
        }
    }
    var o = new MyObject("Jack");
    o.setName("Michale");
    console.info(o.getName());


    /**
     * 静态私有变量
     * 即通过闭包+原型的模式来弄的
     * 原型上挂一个闭包函数，这个函数调用外部函数的变量；
     * 然后所有实例都能够通过特权方法访问静态私有变量了
     *
     * */
    var a = function() {
        var name = '这是一个静态变量';
        var editNumber = 0;
        function edit(){
            editNumber++;
        }
        // 未经声明就使用的变量会成为全局变量
        Aobject = function () {
        };
        Aobject.prototype.getName = function () {
            return name;
        };
        Aobject.prototype.setName = function (value) {
          name = value;
          edit();
        }
    };
    a();

    var myAobject = new Aobject();
    var himAobject = new Aobject();
    // 这是一个静态变量
    myAobject.getName();
    himAobject.setName('是的');
    // 是的
    myAobject.getName();


    /**
     * 模块模式
     * 为单例创建私有变量和特权方法
     * */

    // js 通过对对象字面量创建单例对象
    // 一个类只有一个实例叫单例模式，这下好，连构造函数都没有，可不是单例吗？
    var singleton = {
        name: 'value',
        method: function () {
            // do something
        }
    }

    // 为单例添加私有变量和特权方法

    var singletona = function () {
        var privateVar = 10;
        function privateFunction() {
            return false;
        }
        return {
            publicVar: true,
            publicMethod: function () {
                privateVar++;
                return privateFunction();
            }
        };
    }();// 要()一下，不然singletona就接收的是个函数了

    console.info(singletona.publicVar);
    console.info(singletona.publicMethod());
