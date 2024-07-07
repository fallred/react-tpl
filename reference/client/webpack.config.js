const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: process.env.NODE_ENV == "production" ? "production" : "development", //默认是开发模块
    entry: {
        main: "./src/index.js"
    },
    devtool:false,
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/"
    },
    devServer: {
        hot: true,
        static: path.join(__dirname, "static"),
        historyApiFallback: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                },
                include: path.resolve('src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "px2rem-loader",
                        options: {
                            remUnit: 75,
                            remPrecesion: 8,
                        },
                    },
                    "less-loader",
                ],
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                type: 'asset'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'static'), to: path.resolve(__dirname, 'dist') }
            ]
        })
    ],
};