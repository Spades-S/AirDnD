// Created by Spades<spadesge@gmail.com> on 18/06/06

const { baseURL } = require('../config/index')

const SaleModel = require('../controller/sale')
const RentModel = require('../controller/rent')


function getListResByType(router) {
    router.get(`${baseURL}/list/:type/:page`, async (ctx, next) => {
        const { type, page } = ctx.params
        if (type === 'total') {
            await next()
        } else if (type === '1') {
            const res = await SaleModel.getResByPage(parseInt(page, 10))
            ctx.body = res
        } else if (type === '0') {
            const res = await RentModel.getResByPage(parseInt(page, 10))
            ctx.body = res
        }
    })
    router.get(`${baseURL}/list/total/:type`, async (ctx) => {
        const { type } = ctx.params
        let num = 0
        try {
            if (type === '1') {
                num = await SaleModel.getTotalNum()
            } else if (type === '0') {
                num = await RentModel.getTotalNum()
            }
        } catch (err) {
            console.log(`[controller/list err]   ${err}`)
            ctx.throw('500')
        }
        ctx.body = {
            num
        }
    })
}

module.exports = {
    init(router) {
        getListResByType(router)
    }
}
