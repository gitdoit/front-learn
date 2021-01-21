# 初步使用webpack

## 一、核心概念

### 1、Entry

> 入口，指示`webpack`应该从哪个文件开始进行打包，分析内部依赖。将相关的资源进行处理。

### 2、Output

> 输出，指示`webpack`打包后的资源输出到那里去以及如何命名。

### 3、Loader

> `Laoder`让`webpack`能够去处理那些非`JavaScript`文件。

### 4、Plugins

> 插件可以用于执行范围更广的任务。包括打包优化和压缩，一直到重新定义环境变量。

### 5、Mode

> 环境

## 二、基本使用

### 1、局部安装webpack

```shell
# 初始化项目
npm init
# 安装webpack
npm i webpack -D
# 安装webpack命令行工具
npm i webpack-cli -D
# 测试安装
npx webpack -version
```

### 2、webpack基本配置

```javascript

// path模块是nodeJs内置专门操作路径的
const path = require('path');
module.exports = {
    // 开发模式，代码不压缩
    mode: 'development',
    // 指定打包入口，使用index.js作为打包入口
    // __dirname是nodeJs的内置变量，代表当前文件所在文件夹的绝对路径
    entry: path.join(__dirname, './src/index.js'),
    output: {
        // 输出文件的存放位置即当前项目根路径下的dist文件夹内
        path: path.join(__dirname, './dist'),
        // 出输的文件名称;配合上一行的path，得到最终文件在 ./dist/js/bundle.js
        filename: 'js/bundle.js'
    },
    // 配置打包过程中需要用到的插件
    plugins: [ ],
    // weboack默认只能处理js文件
    // 项目中的其他文件需要下面这些loader来处理
    module: {
        // 配置规则，处理各种文件依赖
        rules: [  ]
    }
}
```



### 3、添加各种功能

#### 1). 处理html资源

> 默认情况下这个插件会创建一个空`html`文件，并引入打包后输出的`js`/`css`等资源；
>
> 单页面下我们指定一个模板文件，让他把打包后的资源引入到这个模板文件里面，然后输出到打包后的文件夹内。
>
> 多页面怎么搞啊？

1. 安装依赖

   ```shell
   npm i html-webpack-plugin -D
   ```

2. 配置文件

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   module.export = {
     
     // 省略其他...
     
     plugins:[
       new HtmlWebpackPlugin(
         {
           // 复制模板文件，在这个文件中引入打包后的资源
           template: './src/index.html',
           // 并输出到这个文件内
           filename: 'index.html'
         }
        ),
     ]
   }
   ```

   

#### 2). 使用css-loader处理样式

> `webpack`默认不会处理`css`样式，这个时候需要配置`Loader`来处理。
>
> 实现：将入口文件引入的`css`文件在构建时输出到目标文件内
>
> - `css-loader`
>
>   能够将引入的`css`文件翻译成js并导入到主js文件内。
>
> - `mini-css-extract-plugin`
>
>   能够将`css-loader`处理后的`js`表示的`css`提取输出到目标`css`文件内。
>
> - `style-loader`
>
>   如果构建项目时不想将`css`单独提取成一个`css`文件，用这个`loader`能够将`css-loader`处理后的结果放到`html`文件的`style`标签里，就相当于直接把`css`写在页面上。
>
> - `less`和`less-loader`
>
>   能够处理`less`语法，处理后的结果才能被`css-loader`继续加工。

1. 安装依赖

   ```shell
   # 用来将css外部文件处理成js表示的样式表
   npm i css-loader -D
   # 解析less
   npm i less -D
   # 同css-loader
   npm i less-loader -D
   # 将上面处理后的js表示的css，提取成css文件并插入到html
   npm i mini-css-extract-plugin -D
   ```

2. 配置loader

   ```javascript
   const MiniCssExtractPlugin =  require('mini-css-extract-plugin');
   module.exports = {
     
     		// ...省略其他
     
         plugins:[
           // 处理CSS
           new MiniCssExtractPlugin({
               // 提取的css输出到指定文件
               filename:'css/build.css'
           })
         ],
         module:{
           rules: [
             {
               test: /\.css$/,
               use: [
                 // 这个可以提取成一个单独的css文件并引入
                 MiniCssExtractPlugin.loader,
                 'css-loader'
               ]
             },
             // 处理less的loader
             {
               test: /\.less$/,
               use: [
                 // 'style-loader', 
                 
                 // 这个可以提取成一个单独的css文件并引入
                 MiniCssExtractPlugin.loader,
                 'css-loader', 
                 'less-loader'
               ]
             },
           ]
         }
       }
   ```



#### 3). 使用file-loader处理资源引入

>  [url-loader Vs file-loader](https://stackoverflow.com/questions/49080007/url-loader-vs-file-loader-webpack) 
>
> [教程](https://www.jiangruitao.com/webpack/url-loader/)
>
> * `file-loader` 
>
> ​	它本质功能是复制资源文件并替换访问地址，例如我们在`css`里使用`background-img:url(../xx.jpg)`语法的时候，它会将这个资源输出到打包后的文件夹下，并替换使用的url。不仅能够解析这种语法，还能解析js文件中`import`的图片；但是不能处理在html中`<img src='xxx.jpg'>`的需求，这需要另一个`loader`；除了处理图片，还能处理其他的资源引入需求。
>
> * `url-loader ` 
>
> ​	内部包含并基于`file-loader`，如果引入的图片很小，单独发一个请求网络开销有点大，所以这个`loader`就用来处理小图片，将它加工成`base64`。
>
> - `html-loader`
>
>   上面的两种`loader`不能处理`html`中图片标签引入的图片，这个`loader`就是用来干这个的。

1. 安装依赖

   ```shell
   npm i file-loader -D
   npm i url-loader -D
   npm i html-loader -D
   ```

2. 配置文件

   ```javascript
   module.exports = {
     module: {
       rules: [
         // 处理url引用,但是不能处理html文件中的url引入
         {
           test: /\.jpg|png|gif|bmp$/,
           use: {
             loader: 'url-loader',
             options: {
               // 文件名取图片hash值前10位
               name:'[hash:10].[ext]',
               // 当图片小于1kb时，将图片转为base64，这样减少网络请求
               limit: 1 * 1024,
               // url-loader默认使用es6的模块化语法
               // 而html-loader使用commonJs的模块化语法，会有冲突，关掉这个
               esModule: false,
               // 打包后输出位置
               outputPath:'imgs'
             }
           }
         },
         // 处理html中img标签引入的图片，从而能被url-loader处理
         {
           test: /\.html$/,
           use: ['html-loader']
         },
         // 其他资源使用file-loader
         {
           exclude: /\.(css|less|js|html)$/,
           loader: 'file-loader',
           options:{
             name: '[hash:10].[ext]'
           }
         }
       ]
     }
   }
   ```



#### 4)、使用babel处理Js语法兼容性

> 详细笔记看之前的模块化里面的`babel`章节，以及博客[babel教程](https://www.jiangruitao.com/babel/babel-preset-env/)
>
> 这里简单说一下
>
> - `@babel/preset-evn`
>
>   [预设集合说明](https://babeljs.io/docs/en/babel-preset-env)
>
>   官方做好的一个基本的插件预设集合，能够处理ES6语法到ES5，如果不用这个，就需要自己手动配置各种语法处理的插件。
>
> - `@babel/plugin-transform-runtime`
>
>   [详细配置说明](https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs)
>
>   上面那个只能处理语法，不能处理`API`，例如`[1,2].includes(1)`就会原样输出。
>
> - `@babel/plugin-proposal-class-properties`
>
>   实验性的新语法，官方给的插件包不包含，如果要用类的静态属性语法，就要用这个插件处理一下。

1. 安装依赖

   ```shell
   # 安装babel核心 以及命令行接口
   npm install --save-dev @babel/core @babel/cli 
   # 安装一组官方预设好的ES6语法编译插件，可以将新【语法】编译成目标浏览器能够执行的代码
   npm install --save-dev @babel/preset-env
   # 安装【API】转换插件，通过按需导入的方式向js代码中添加你使用的【API】支持
   # 例如[].includes(),ES5没有，但是你用了，他就会自动给你添加这个实现
   npm install --save-dev @babel/plugin-transform-runtime
   # 安装运行时依赖，相当于maven里的runtime scope，
   npm install @babel/runtime-corejs3
   # 上面的预设不包含Class静态属性语法，用这个
   npm i @babel/plugin-proposal-class-properties -D
   ```

2. 配置

   ```javascript
   // 在webpack.config.js的插件中配置
   {
     //处理js
     test: /\.js$/,
       // 使用babel-loader
       use: 'babel-loader',
       // 排除模块目录
       exclude: /node_modules/
   }
   // 根目录新建babel.config.js，内容参考 模块化-babel
   ```



#### 5)、使用`postcss`处理`css`语法兼容性

> - `postcss-loader`
>
>   加载`css`资源用来给`postcss`处理
>
> - `postcss`
>
>   PostCSS 接收一个 CSS 文件并提供了一个 API 来分析、修改它的规则（通过把 CSS 规则转换成一个[抽象语法树](https://zh.wikipedia.org/wiki/抽象語法樹)的方式）。在这之后，这个 API 便可被许多[插件](https://github.com/postcss/postcss/blob/main/README-cn.md#插件)利用来做有用的事情，比如寻错或自动添加 CSS vendor 前缀。
>
> - `postcss-preset-env`
>
>   作用和babel的预设差不多，这个是将css的高级语法处理成为目标浏览器能够识别的css样式。
>
>   这个预设包含了`autoprefixer`!!
>
> [postcss简单介绍](https://webpack.docschina.org/loaders/postcss-loader/)

1. 安装依赖

   ```shell
   npm i postcss-loader -D
   # 安装预设，估计这里面包含了 postcss? 
   npm i postcss-preset-env -D
   ```

2. 配置文件

   ```javascript
   // webpack.config.js
   module.exports = {
   	rules: [
   		{
         test: /\.css$/,
         use: [
           // 这个可以提取成一个单独的css文件并引入
           MiniCssExtractPlugin.loader,
           // 将样式文件加载到js里
           'css-loader',
           // 有的教程在这里配置预设
           // 也可以单独提取postcss.config.js
           'postcss-loader',
         ]
       },
   	]
   }
   
   
   // postcss.config.js
   // 上面的postcss-loader执行时会加载这个配置文件
   module.exports = {
     plugins: ["postcss-preset-env"]
   }
   
   // 根目录新建 .browserslistrc，记得要删掉webpack.config.js中的browserslist配置项
   // 支持浏览器选项，不光postcss能用，babel也能用
   // https://github.com/browserslist/browserslist
   [production staging]
   > 1%
   last 2 versions
   not dead
   
   [development]
   last 1 chrome version
   last 1 firefox version
   ```



#### 6)、压缩css资源

> 参考：[压缩插件](https://awdr74100.github.io/2020-07-06-webpack-optimizecssassetswebpackplugin/)
>
> 使用插件`optimize-css-assets-webpack-plugin`，将输出的css文件压缩成一行，减少体积。

1. 安装依赖

   ```shell
   npm i optimize-css-assets-webpack-plugin -D
   ```

2. 配置文件

   ```javascript
   // webpack.config.js
   const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
   module.exports = {
     plugins: [
       new OptimizeCssAssetsPlugin({
         assetNameRegExp: /\.css$/g,
         cssProcessor: require('cssnano'),
         cssProcessorOptions: {
           map: {
             inline: false,
             annotation: true,
           },
         },
         cssProcessorPluginOptions: {
           preset: ['default', { discardComments: { removeAll: true } }],
         },
       }),
     ]
   }
   ```



#### 7)、使用Eslint检查语法

> 多人开发一个项目，为了统一编码风格，用`Eslint`来做检查。
>
> [Eslint官网教程](https://cn.eslint.org/docs/user-guide/configuring)      [简书说人话版教程](https://juejin.cn/post/6844903859488292871)
>
> [解决Js高级语法检查的问题](https://stackoverflow.com/questions/36001552/eslint-parsing-error-unexpected-token)
>
> [airbnb规则](https://github.com/lin-123/javascript)

1. 安装依赖

   ```shell
   # 已过期，但是那个插件不好用，不生效。翻遍全网都没资料，还是继续用这个吧
   npm i eslint-loader -D
   npm i eslint  -D
   
   # 上面的loader标记过期了，但是这个插件不生效，不好用，不要用
   # npm i eslint-webpack-plugin -D
   
   # 语法风格规则集合
   npm i eslint-config-airbnb-base -D
   npm i eslint-plugin-import -D
   # 和Babel一起工作时需要
   npm i babel-eslint -D
   ```

2. 配置文件

   ```javascript
   // webpack.config.js
   // const ESLintPlugin = require('eslint-webpack-plugin');
   module.exports = {
   	plugins: [
       //new ESLintPlugin({
         // 自动修复
         //fix: true,
         // 检查.js文件语法
         //extensions: 'js',
       //}),
     ]
     module:{
     	rules:[
     		{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'eslint-loader',
     			enforce: 'pre',
           options: {
             // 自动修复eslint的错误
             fix: true,
           },
         },
     	]
   	}
   }
   
   // 配置方法一、根目录新建 .eslintrc.js
   module.exports = {
     env: {
       browser: true,
       node: true,
       es6: true,
     },
     extends: [
       // 使用airbnb-base
       // 规则详见 https://github.com/lin-123/javascript
       'airbnb-base',
     ],
     parser: 'babel-eslint',
     rules: {
       // 如果觉得某个规则有毛病，这样给他关掉
       'no-new-object': 'off',
     },
     // 全局变量，这样可以在js中不声明直接用而不被eslint提示
     // 前提是这个全局变量必须要有
     globals: {
       $he: true,
     },
   };
   
   
   // 配置方法二 在package.json中新增配置项
   "eslintConfig": {
       "extends": "airbnb-base",
       "env": {
         "browser": true
       }
     	"parser": "babel-eslint"
     }
   ```

3. **结合VS CODE**

   > 配合`vs code`让风格有问题的代码出现波浪线提示，并且在保存的时候自动修复。坑爹，很难配
   >
   > 先安装插件，去插件市场下载 `Eslint`

   ```javascript
   // 在当前项目工作区配置vscode，即.vscode/settings.json
   {
     "eslint.codeAction.disableRuleComment": {
       "autoFixOnSave": "true"
     },
     "eslint.codeAction.showDocumentation": {
       "enable": true
     },
     "editor.codeActionsOnSave": {
       "source.fixAll": true,
       "source.fixAll.eslint": true
     },
     "eslint.quiet": true,
     "eslint.format.enable": true,
     "editor.formatOnSave": true,
     "eslint.probe": [
       "javascript",
       "javascriptreact",
       "typescript",
       "typescriptreact",
       "html",
       "vue",
       "markdown"
     ],
     "eslint.validate": [
       "javascript"
     ],
     "eslint.alwaysShowStatus": true
   }
   ```

   

### 4、配置开发服务器

> 就是实时预览

1. 安装依赖

   ```shell
   npm i webpack-dev-server -D
   ```

2. 配置文件

   ```javascript
   // webpack.config.js
   module.export = {
   	 // 省略其他
     devServer:{
       // 基础路径，就是打包后的路径
       contentBase: path.join(__dirname,'dist'),
       // 开启压缩
       compress: true,
       // 启动在3000端口
       port: 3000,
       // 启动后自动开启浏览器进行预览
       open: true
     }
   }
   // package.json
   {
     // 省略其他
     "scripts": {
       "dev": "webpack-dev-server",
     }
   }
   ```

3. 使用

   `npm run dev`