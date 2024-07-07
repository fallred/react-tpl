const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development',
    //如果当前是开发环境，则生成source-map方便调试，否则是不生成sourcemap避免代码泄露
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    entry: {
        main: './src/index.js'
    },//指定打包的入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),//分析得到当前目录下面的dist目录
        filename: '[name].js',//指定打包后的文件名
        publicPath: '/',//设置引入打包后的文件的时候的公共路径
    },
    devServer: {
        port: 8080,//设置开发服务器端口号，不写默认也是8080
        hot: true,//启用模块热替换
        //使用HTML5和history API的时候，任意的404的响应都要替换为index.html
        historyApiFallback: true,//404s will fallback to '/index.html'
        //配置静态文件目录
        //Content not from webpack is served from 'C:\public' directory
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
    },
    //配置查找路径的时候的解析规则 
    resolve:{
        alias:{//配置解析路径的别名，让@指向当前目录下面的src路径
            '@':path.resolve(__dirname,'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',//使用babel来转换JS代码
                options: {
                    presets: [
                        "@babel/preset-env",//把ES6/7转成ES5
                        [
                            "@babel/preset-react",//把React转成ES5
                            {
                                runtime:'automatic'//classic
                            }
                        ]
                        
                    ]
                },
                exclude: /node_modules/ //排除node_modules目录
            },
            {
                test:/\.css$/,///如果模块的文件名是以.css结尾的话
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,///如果模块的文件名是以.less结尾的话
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                          remUni: 75,
                          remPrecision: 8
                        }
                      },
                    'less-loader'
                ]
            },
            {
                test:/\.(jpg|png|gif|bmp|svg)$/,
                type:'asset'//webpack5 asset modules 
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        //拷贝文件的webpack插件
        new CopyWebpackPlugin({
            patterns:[//规则 
                {//把from里的文件都拷贝到dist目录里去
                    from:path.resolve(__dirname, 'public'),
                    to:path.resolve(__dirname, 'dist')
                }
            ]
        })
    ]

}