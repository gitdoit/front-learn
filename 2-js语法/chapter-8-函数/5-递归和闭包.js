/******************************************递归************************************/

    /**经典阶乘递归*/
    function factorial(num) {
        if(num <= 1){
            return num;
        }else {
            //return num * factorial(num -1);
            // 不要使用factorial()来调用 => factorial = null;
            return num * arguments.callee(num - 1);
        }
    }
    console.info(factorial(3));

    /*****************************************闭包*********************************************/
    /**
     * 简单来说，就是在一个外部函数中创建一个内部函数，这个内部函数就能够访问外部函数中的变量；
     * 这个外部函数逻辑执行完毕之后它自己的局部变量不会被销毁，会一直被内部函数持有，直到内部函数被销毁。
     * 解决的问题是，又想在一个函数中重复使用一个变量，又不想把这个变量定义成全局的。
     *
     * 原理：
     * 首先解释几个名词：
     *  1、活动对象(变量对象)，即持有该函数局部变量的对象
     *  2、执行环境，函数的执行环境，包含一条作用域链；在函数被调用时才存在，调用结束被销毁。
     *  3、作用域链，本质上是一个指针列表，每个节点都指向各个函数的变量对象。
     *
     * 以下面这个函数为例
     * 1、【创建】createCompareFunction时，该函数对象的[[scope]]属性持有一个包含全局变量对象的作用域链；
     * 2、【调用】createCompareFunction时
     *      1、创建执行环境
     *      2、把该函数的作用域链复制到执行环境中
     *      3、创建活动对象(变量对象) 包含 name，arguments
     *      4、把活动对象推入作用域链前端
     *      5、【创建】内部匿名函数，该函数对象的[[scope]]属性会持有createCompareFunction执行环境中的作用域链
     * 3、【返回】匿名函数的引用
     * 4、【销毁】createCompareFunction函数的执行环境(包含它的作用域链)
     *           正常情况下该函数的活动对象也应该被销毁，但是由于内部匿名函数引用了它，所以得以保留。
     * 4、【调用】匿名函数
     *      1、创建执行环境
     *      2、把该函数的作用域链复制到执行环境中
     *      3、创建活动对象(变量对象) 包含o1,o2
     *      4、把对象推入作用域链前端
     *
     * 结果就是匿名函数持有的作用域链包含了[自己的活动对象,外部函数的活动对象,全局变量对象]
     * 内部函数不销毁，外部函数的活动对象就不能释放。
     *
     * */

    function createCompareFunction(name) {

        return function (o1,o2) {
            // 能够访问外部函数变量 name
            var att1 = o1[name];
            var att2 = o2[name];
            return att1.length > att2.length ? 1 : att1.length === att2.length ? 0 : -1;
        }
    }
    var o1 = {name:"123"};
    var o2 = {name:"12"};
    // createCompareFunction 执行完毕了，按理说应该栈帧被弹出来，局部变量被销毁了
    // 但是由于内部函数的原因，外部函数的局部变量还能被访问
    let compareFunction = createCompareFunction("name");
    console.info(compareFunction(o1,o2))


    /*************************************闭包与变量************************************************/
    /**
     * 首先变量i是函数的局部变量，不是循环体内的变量。
     * 所以变量i在createFunctions函数的变量对象中。
     * 循环创建的10个内部函数，都持有相同的createFunctions的变量对象
     * 那么返回值自然就都是10
     */
    function createFunctions() {
        // 函数数组
        var funs = new Array();
        for(var i = 0 ; i < 10 ; i++){
            funs[i] = function () {
                return i;
            }
        }
        return funs;
    }
    createFunctions().forEach(e => {
        // 按理说应该打印1...9
        console.info(e());
    })

    /*************************************闭包中的this对象************************************************/
    /**
     * 总结：函数在谁身上调用，this就是谁。箭头函数和eval特殊
     * 一般来说在闭包中的this对象都是window全局对象
     * */
    var name = "The Window";
    var object = {
        name : "My Object",
        // 如果想使用外部函数的this
        // 可以 var _this = this;
        getNameFunc : function(){
            return function(){
                return this.name;
            };
        }
    };
    // 因为调用这个闭包函数的是window
    // object.getNameFunc()() ==》 var inner = object.getNameFunc(); inner();
   console.info(object.getNameFunc()())

    /*************************************模仿块级作用域************************************************/
    /**
     * js没有像java那样的块级作用域
     * */
    function outer() {
        (function inner() {
            for(var i = 0 ; i < 10; i++){
                console.info(i);
            }
        })();
        // 报错，访问不到
        //console.info(i);
    }
