// Created by Spades <spadesge@gmail.com> on 18/3/13
const path = require('path')

module.exports = {
    assetBasePath: path.resolve(__dirname, '../../Dist'),
    // assetBasePath: '/mnt/www',
    baseURL: '/api/v1',
    debug: process.env.NODE_ENV === 'development',
    env: process.env.NODE_ENV || 'production',
    enableCompress: true,
    port: 3000,
    secretKey: 'xidan',
    staticPath: '/mnt/www'
}
