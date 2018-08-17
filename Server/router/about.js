// Created by Spades<spadesge@gmail.com> on 18/06/12

const { baseURL } = require('../config/index')
const { getData, updateData } = require('../controller/about')

function getAbout(router) {
    router.get(`${baseURL}/about`, async (ctx) => {
        let res = []
        try {
            res = await getData()
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = res
    })
}

function updateAbout(router, verify) {
    router.put(`${baseURL}/about`, verify, async (ctx) => {
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
        getAbout(router)
        updateAbout(router, verify)
    }
}