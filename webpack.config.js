const path = require('path');
// const cssLoader = require('css-loader')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {DefinePlugin} = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // 设置模式
    mode: "development", // production | node
    // 设置source-map，建立js映射文件，方便调试程序
    devtool: "source-map",  // eval
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/bundle.js',
        assetModuleFilename: "img/[name]_[hash:8][ext]"
    },
    module: {
        rules: [
            // 1. 第一种写法
            // {
            //     test: /\.css$/,
            //     loader: "css-loader"
            // }
            // 2. 使用use方法
            // {
            //     test: /\.css$/,
            //     use: [
            //         "css-loader"
            //     ]
            // }
            // 3. 带参数的use
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 // 其它参数
            //             }
            //         }
            //     ]
            // }
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"}
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: "asset",
                generator: {
                    filename: "img/[name]_[hash:6][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024
                    }
                }
            },
            // // 1. file-loader
            // {
            //     test: /\.(eot|fft|woff2?)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: "font/[name]_[hash:6].[ext]"
            //     }
            // },
            // 2. webpack5新功能
            {
                test: /\.(eot|fft|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "font/[name]_[hash:6][ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(), // HTML模板文件入口，可设置多页应用
        new DefinePlugin({
            BASE_URL: "'./'"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    globOptions: {
                        ignore: [
                            "**/index.html"
                        ]
                    }
                }
            ]
        })
    ]
}