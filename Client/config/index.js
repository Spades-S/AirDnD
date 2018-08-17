// created by Spades <spadesge@gmail.com> on 18/3/13

const path = require('path')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}


module.exports = {
    assetsRoot: resolve('../../Dist'),
    axiosBaseURL: 'http://localhost:3000/api/v1',
    axios: {
        baseURL: 'http://localhost:3000/api/v1',
        withCredentials: true
    },
    // axiosBaseURL: 'http://39.104.16.1:3000/api/v1',
    // axiosBaseURL: '/api/v1',
    build: {
        node_env: 'production',
        cssSourceMap: true,
        usePostCss: false,
        devtool: 'source-map',
        index: resolve('../../Dist/index.html'),
        productionGzip: true
    },
    dev: {
        node_env: 'development',
        cssSourceMap: true,
        usePostCss: false
    },
    publicPath: '/',
    styleLang: 'scss'
}