# `Webpack` 优化

### 1、`HMR`-热模块加载

> 使用`webpack-dev-server`开启开发服务的时候，如果修改了某个`css`文件或者是某个`js`文件就会导致整个模块被重新加载，这样在项目非常大的时候会很慢，我们只需要对修改了的服务进行重新编译加载就行了

1. 修改`webpack.config.js`

   ```javascript
   // 在开发服务器选项中开启 `HMR`,设置`hot:true`
   module.exports = {
     devServer: {
       // ...
       hot: true
     }
   }
   ```

2. 解决修改`html`不更新的问题

   > 开启了`HRM`之后，修改`index.html`就不会更新了，需要将入口处添加`index.html`

   ```javascript
   module.exports = {
     // ...
     entry: ['./src/index.js', './src/index.html'],
   }
   ```

3. 解决修改单个`js`文件全局刷新的问题

   ```javascript
   // index.js
   if (module.hot) {
     // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
     module.hot.accept('./js/module', () => {
       // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
       // 会执行后面的回调函数
       fun();
     });
   }
   ```

   

### 2、`source-map`快速定位异常

> `source-map`就是用来映射原代码和编译后代码关系的技术，方便我们在开发或生产环境快速定位异常。
>
> 总结：
>
> ​	开发环境使用： `eval-source-map`
>
> ​	生产环境使用：`source-map`

1. 配置

   ```javascript
   module.exports = {
     devtool: 'eval-source-map'
   }
   ```

   

2. 选择组合

```
source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map：外部
      错误代码准确信息 和 源代码的错误位置
    inline-source-map：内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    hidden-source-map：外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map：内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误位置
    nosources-source-map：外部
      错误代码准确信息, 但是没有任何源代码信息
    cheap-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      只能精确的行
    cheap-module-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      module会将loader的source map加入

    内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好
      速度快(eval>inline>cheap>...)
        eval-cheap-souce-map
        eval-source-map
      调试更友好  
        souce-map
        cheap-module-souce-map
        cheap-souce-map

      --> eval-source-map  / eval-cheap-module-souce-map

    生产环境：源代码要不要隐藏? 调试要不要更友好
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

      --> source-map / cheap-module-souce-map
```



### 3、`oneOf`加快构建速度

> 我们会配置很多`loader`来处理文件，如果一个文件被某个`loader`命中之后并不会`break`，而是会继续向下匹配，大多数情况下，我们一种类型的文件只会被一个`loader`处理，所以需要一个`break`机制来处理这种情况。

1. 配置文件

   ```javascript
   module.exports = {
     module: {
       plugins: [
         // 执行后会继续向下匹配的loader单独拎出来
         // 例如这个语法检查完成之后，还需要使用babel来做兼容性
         {
           loader: 'eslint-loader',
           test: /\.js$/,
           exclude: /node_modules/,
           // 优先执行
           enforce: 'pre',
           options: {
             fix: true,
           },
         },
         {
           // 其他执行一次就会break的loader
           oneOf:[
             // ...
             {
               test: /\.js$/,
               use: 'babel-loader',
               exclude: /node_modules/,
             },
             // ...
           ]
         }
       ]
     }
   }
   ```



### 4、客户端缓存

> 就是让生成的`css`、`js`文件命名的时候加上后缀，这个后缀可以根据内容来生成`hash`值，这样每当我们对某个文件修改了的时候，发布生产环境之后用户就对指定的文件请求，没改的就读浏览器缓存。

1. 修改配置

   ```javascript
   module.exports = {
     output: {
       path: path.join(__dirname, 'dist'),
       // js文件根据内容生产hash值后缀
       filename: 'js/bundle.[contenthash:10].js',
     },
     plugins: [
       // 修改css生产文件名规则
       new MiniCssExtractPlugin({
         filename: 'css/build.[contenthash:10].css',
       }),
     ]
   }
   
   ```

2. 执行打包命令之后就能看到效果了



### 5、构建时`babel`缓存

> `babel`语法编译比较消耗资源，开启`babel`缓存配置项能够提升构建速度。

1. 配置

   ```javascript
   module.exports = {
     module:{
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: [
                 [
                   '@babel/preset-env',
                   {
                     targets: {
                       edge: '17',
                       firefox: '60',
                       chrome: '67',
                       safari: '11.1',
                     },
                     useBuiltIns: 'usage',
                     corejs: '3.6.4',
                   },
                 ],
               ],
               plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
               // 开启构建缓存，性能提升
               cacheDirectory: true,
             },
           },
         },
       ]
     }
   }
   ```

   

### 6、`tree shaking` 去除无效代码

> 通常情况下我们只是用某个组件的很小部分功能，但是在打包的时候会将这个组件的所有代码都打包进来，很显然是不合理的。所以我们使用`tree shaking`来将这些未使用的代码给 “摇”下来。
>
> [参考](https://webpack.docschina.org/guides/tree-shaking/)
>
> [简书-参考](https://juejin.cn/post/6844903687412776974)

1. 配置

   ```javascript
   // 必须使用es6的模块化，这样才能在编译时期确定依赖，从而tree shaking
   // 开启生产环境
   // 在package.json中新增配置
   
   // 默认所有引入的依赖都没有副作用，可以直接配置成false
   // 例如polyfill就有，他引入之后并没有使用，而是在全局挂了很多API，这就是副作用
   // CSS文件也是，单纯的引入，在运行时生效
   "sideEffects": false
   
   // 上面的太粗暴，这样我们的css就不被打包了，需要这样
   // 可以使用通配符指示哪些文件忽略tree shaking
   "sideEffects":["*.css",".less" "./src/xxx.js"]
   ```

   

### 7、代码分割

> 代码分割能够将代码分割到不同的bundle中，这样能够减少整个大bundle的体积，从而按需加载，加快客户端的加载速度。

#### 1、入口点配置

> 使用`entry`手动配置代码分割，这种方式最简单，**但是却没法抽取公用部分代码**

1. 配置

   ```javascript
   module.exports = {
     entry: {
       // 入口点1
       index: '.src/js/index.js',
       // 入口点2
       another: '.src/js/another-index.js',
     },
     output: {
       // 文件名不要写死了
       filename: '[name].[contenthash:10].js',
       path: path.join(__dirname, 'dist'),
     }
   }
   ```

2. 输出

   ```html
   <html>
   <!--省略其他-->
     <body>
       <script src="js/index.84b58e27f4.js"></script>
       <script src="js/another.afd08093f5.js"></script>
     </body>
   </html>
   ```



#### 2、防重复依赖配置

> 两个入口点都引入了`jquery`依赖，如果不将公共的依赖提取出来，那么两个入口点文件都会把`jquery`依赖重复引入。需要一个能够提取公共依赖的东西。

1. 配置

   ```javascript
   module.exports = {
     entry: {
       index: '.src/js/index.js',
       another: '.src/js/another-index.js',
     },
     optimization: {
       // 新增这个配置，提取公共依赖
       splitChunks: {
         chunks: 'all',
       },
     },
   }
   ```

2. 输出

   ```html
   <html>
     <body>
       <!--公共的jquery依赖-->
       <script src="js/vendors~another~index.4ecc66ff53.js"></script>
       <script src="js/index.e2f36cbce0.js"></script>
       <script src="js/another.09fe30586a.js"></script>
     </body>
   </html>
   ```



#### 3、动态导入

> 通过`es6`的`import()`动态导入`API`，也能实现代码分割的效果；
>
> `/* webpackChunkName: "print" */'` 通过在`import()`函数处添加注释，会配置动态导入的代码生成的分离代码文件名。
>
> 例如下面这个动态导入的代码生成的文件名就是 `print.1403a051e8.js`

1. 配置

   ```javascript
   // 配置babel,不然不支持这个API
   // 如果babel是在webpack.config.js中配置的，需要修改Loader
   {
     test: /\.js$/,
       exclude: /node_modules/,
         use: {
           loader: 'babel-loader',
             options: {
               presets: [
                 [
                   '@babel/preset-env',
                   {
                     useBuiltIns: 'usage',
                   },
                 ],
               ],
                 plugins: [[
                   '@babel/plugin-transform-runtime',
                   {
                     // 指定版本
                     corejs: '3',
                   },
                 ], '@babel/plugin-proposal-class-properties'],
                   // 开启构建缓存，性能提升
             },
             },
         },
   ```

   

2. 代码

   ```javascript
   import(/* webpackChunkName: "print" */'./js/treeshaking').then((mul) => {
     console.log(mul(2, 3));
   }).catch(() => {
     console.log('fail import!');
   });
   ```

   

### 8、模块懒加载

> 页面有很多功能，但是并不是每个功能用户都会使用到，所以可以使用懒加载的方式在用户使用到某个功能的时候再去加载这个模块。这样能够提升用户体验，减少不必要的网络开销。省钱！
>
> 这需要配合`ES56`的提案方法`import()`动态导入！

1. 编写代码

   ```javascript
   // index.js
   
   console.log('index.js文件被加载了...');
   // 懒加载，只有点了这个按钮才会去加载
   document.getElementById('btn').onclick = function() {
     import(/* webpackChunkName: 'print', webpackPrefetch: true */'./print').then((module) => {
       module.default();
     });
   }
   
   // print.js
   console.log('print.js文件被加载了...');
   export default function(){
     console.log('我是print.js里面的一个打印函数！');
   }
   ```

2. 效果

   > 只有用户在点击了这个按钮的时候,`print.js`才会被加载！



### 9、渐进式网络应用程序

> ​	就是服务器不在线，客户端也能正常运行。我们平时把后台关掉了，如果不是前后端分离的话，那么前端再刷新就会来个“无法访问此网站”，但是如果用了这个技术，客户端也能运行，但是请求接口我估计是不行了，具体还没研究，先上手玩玩。
>
> 这玩意谁研究的呢？真能

1. 安装依赖

   ```javascript
   // 插件
   npm i -D workbox-webpack-plugin
   // 再全局装个服务器
   npm i serve -g
   ```

2. 配置文件

   ```javascript
   // webpack.config.js
   const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
   
   // ..省略其他
   module.exports = {
     plugins: [
       new WorkboxWebpackPlugin.GenerateSW({
         /*
           1. 帮助serviceworker快速启动
           2. 删除旧的 serviceworker
           生成一个 serviceworker 配置文件~
         */
         clientsClaim: true,
         skipWaiting: true,
       }),
     ]
   }
   ```

3. 编写代码

   ```javascript
   // index.js
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker
         .register('/service-worker.js')
         .then(() => {
           console.log('sw注册成功了~');
         })
         .catch(() => {
           console.log('sw注册失败了~');
         });
     });
   }
   ```

4. 上手玩玩

   ```javascript
   // 打包
   npx webpack
   // 启动服务器
   serve -s dist
   // 打开浏览器，然后再把服务停掉，再刷新都行
   ```



### 10、`externals` 抽离依赖

> 我们的程序会依赖很多其他东西例如`jquery`、`xlsx`之类的东西，这些依赖在打包的时候都会被打包成一个`js`文件，这样搞的话这个`js`文件会很大，打包耗时很长，而且用户首次加载会很慢，所以我们可以将这些外部依赖抽出来，使用自建`cdn`或者其他途径引入。这时候就需要`externals`配置了！！
>
> [官方文档](https://webpack.docschina.org/configuration/externals/#root)
>
> [找到全局变量](https://juejin.cn/post/6844904190083350542)

1. 配置

   ```javascript
   // webpack.config.js
   module.exports = {
     externals: {
       // 打包忽略jquery的引入
       jquery: 'jQuery'
     }
   }
   // index.js
   import $ from 'jquery';
   $('#id').on('click',()=>{alert('xxx')});
   
   // 在html中手动引入cnd源
   <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
   
   // 打包，浏览，没毛病老铁
   ```

2. `externals`配置说明

   > 

   ```javascript
   externals: {
     // 瞅瞅这个键值对，key就是第三依赖的名称
     // 就是我们import $ from 'jquery' 中的那个 jquery
     // 也就是我们 npm i jquery 的那个jquery
     
     // value是啥？
     //		value就是这依赖执行之后在全局环境中暴露的变量名称
     // 我怎么知道这个全局变量名称是啥啊？？
     //		看源码啊，看看它暴露的是啥
     // 你这不是坑爹吗？源码那么多我怎么看？
     // 		
     jquery: 'jQuery'
   }
   ```

   



### 11、`dll` 加快打包速度

> [详见](https://juejin.cn/post/6844903952140468232)