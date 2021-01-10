// require是nodejs内置的函数
// path模块也是内置的，专门操作路径的
const path = require('path');
// 打包插件，用来处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 处理.Vue文件
const VueloaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    //编译模式
    mode: 'development', //开发模式，代码不压缩
    //_dirname是当前项目的根的绝对路径
    // 指定打包入口，使用index.js作为打包入口
    entry: path.join(__dirname, './src/index.js'),
    output: {
        // 输出文件的存放位置即当前项目根路径下的dist文件夹内
        path: path.join(__dirname, './dist'),
        // 出输的文件名称
        filename: 'bundle.js'
    },
    // 配置打包过程中需要用到的插件
    plugins: [
        // 处理html
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                filename: 'index.html'
            }
        ),
        // 处理vue
        new VueloaderPlugin()
    ],
    // weboack默认只能处理js文件
    // 我们打包的时候会有css等，需要loader来处理这些东西
    module: {
        // 配置规则，处理各种文件依赖
        rules: [
            // 处理css文件的loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 处理url引用
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|woff|woff2$/,
                // ? 后面跟参数，限制文件大小
                use: 'url-loader?limit=3046'
            },
            // 使用babel处理高级JS语法
            {
                //处理js
                test: /\.js$/,
                // 使用babel-loader
                use: 'babel-loader',
                // 排除模块目录
                exclude: /node_modules/
            },
            // 处理vue文件
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    }
}