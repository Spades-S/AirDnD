// Created by Spades<spadesge@gmail.com> on 18/06/13

const captcha = require('trek-captcha')
const { updateVerifyCode } = require('../controller/user')

const { baseURL } = require('../config/index')

function getVerifyCode(router) {
    router.get(`${baseURL}/verifycode`, async (ctx) => {
        const { token, buffer } = await captcha()
        await updateVerifyCode(token)
        ctx.body = `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
    })
}

module.exports = {
    init(router){
        getVerifyCode(router)
    }
}
