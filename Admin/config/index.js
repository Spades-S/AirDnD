// created by Spades <spadesge@gmail.com> on 18/3/13

const path = require('path')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    axios: {
        baseURL: 'http://localhost:3000/api/v1',
        withCredentials: true

    },
    axiosBaseURL: 'http://localhost:3000/api/v1',
    // axiosBaseURL: '/api/v1',
    assetsRoot: resolve('../../Dist'),
    build: {
        node_env: 'production',
        cssSourceMap: true,
        usePostCss: false,
        devtool: 'source-map',
        index: resolve('../../Dist/admin.html'),
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