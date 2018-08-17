// created by Spades <spadesge@gmail.com> on 18/3/13

const { init: initAbout } = require('./about.js')
const { init: initAuthorize } = require('./authorize.js')
const { init: initGuide } = require('./guide.js')
const { init: initList } = require('./list.js')
const { init: initRent } = require('./rent.js')
const { init: initSale } = require('./sale.js')
const { init: initUser } = require('./user.js')
const { init: initVerifyCode } = require('./verifycode.js')
const { init: initService } = require('./service.js')

const verify = require('../middlewares/verify.js')

function setRouters(router) {
    initAbout(router, verify)
    initAuthorize(router, verify)
    initGuide(router, verify)
    initList(router)
    initRent(router, verify)
    initSale(router, verify)
    initUser(router, verify)
    initVerifyCode(router)
    initService(router, verify)
}

module.exports = setRouters
