/**
      箭头函数有几个使用注意点。

      （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

      （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

      （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

      （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

      上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
    
    */
    var makeFun = () => {
      // 1、使用函数表达式
      var inner = function () {
        console.info(this)
      }
      return inner
    }
    var inner = makeFun()
    // this = window
    inner()
    // 改变作用域 this = {x:1}
    inner.call({ x: 1 })

    // 2、使用箭头函数，箭头函数中的this在定义的时候就固定了
    const makeFun2 = () => {
      console.info(this)
    }
    // this = window
    makeFun2()
    // 这样也改不了 this = window
    makeFun2.call({ x: 1 })


    // 3、误区，箭头函数定义时所在的作用域
    var obj = {
      x: 1,
      inner: () => {
        // 这里的this 不是 obj，而是window
        // 这是因为对象不构成单独的作用域，导致inner箭头函数定义时的作用域就是全局作用域。
        console.info(this)
      },
      inner2: function(){
        // 这样this 就指向了 obj
        const i = () => {
          console.info(this)
        }
        i()
      }
    }
    // window
    obj.inner()
    // obj
    obj.inner2()
