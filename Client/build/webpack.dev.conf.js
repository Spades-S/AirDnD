// created by Spades <spadesge@gmail.com> on 18/3/13

process.env.NODE_ENV = 'development'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const path = require('path')

const baseWebpackConf = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')


const devWebpackConf = {
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        contentBase: utils.resolve('../../Dist'),
        hot: true,
        open: true,
        publicPath: '/'
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCss: config.dev.usePostCss
        })
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
    ]
}

devWebpackConf.module.rules.push({
    test: /\.(js|vue)$/,
    include: path.resolve(__dirname, '../src'),
    enforce: 'pre',
    use: [
        'eslint-loader'
    ]
})

module.exports = WebpackMerge(baseWebpackConf, devWebpackConf)

