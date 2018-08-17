// created by Spades <spadesge@gmail.com> on 18/3/13

const compress = require('koa-compress')
const KOA = require('koa')
const Router = require('koa-router')

const config = require('../config')
const init = require('../common/init')
const setRouters = require('../router')


const app = new KOA()
const router = new Router()
setRouters(router)

init(app)
app.use(async (ctx, next) => {
    // ctx.set('Access-Control-Allow-Origin', 'http://39.104.16.1');
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
    ctx.set('Access-Control-Allow-Credentials', 'true')
    await next()
})

app.use(require('koa-logger')())
app.use(compress())

app.use(require('koa-body')({
    multipart: 'true',
    formidable: {
        maxFileSize: 2000 * 1024 * 1024
    }
}))

app.use(router.routes())
    .use(router.allowedMethods());

if (!module.parent) {
    app.listen(config.port);
    logger.info('listening on port %s, the env is %s', config.port, config.env);
    logger.debug('You can debug your app with http://127.0.0.1:%s', config.port);
}
