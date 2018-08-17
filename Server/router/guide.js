// Created by Spades<spadesge@gmail.com> on 18/06/11

const { baseURL } = require('../config/index')
const { getData, updateData } = require('../controller/guide')

function getGuideData(router) {
    router.get(`${baseURL}/guide`, async (ctx) => {
        let res = ''
        try {
            res = await getData()
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = res
    })
}

function updateGuideData(router, verify) {
    router.put(`${baseURL}/guide`, verify, async (ctx) => {
        try {
            await updateData(ctx.request.body)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = 'success'
    })
}

module.exports = {
    init(router, verify) {
        getGuideData(router)
        updateGuideData(router, verify)
    }
}
