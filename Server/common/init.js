// created by Spades <spadesge@gmail.com> on 18/3/13

const KoaNunjucks = require('koa-nunjucks-2')
const onerror = require('koa-onerror')

const config = require('../config')
const Logger = require('./logger')


module.exports = function (app) {

    Logger()

    // 对ctx.onerror做hack，集中处理错误日志
    onerror(app)
    app.on('error', (err) => {
        logger.error(err)
    })
    app.use(KoaNunjucks({
        ext: 'html',
        path: config.viewPath,
        nunjucksConfig: {
            autoescape: true,
            watch: config.debug
        }
    }))
}