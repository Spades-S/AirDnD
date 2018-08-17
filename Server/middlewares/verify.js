// Created by Spades<spadesge@gmail.com> on 18/06/13

const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/index')

module.exports = async function (ctx, next) {
    try {
        await jwt.verify(ctx.cookies.get('TOKEN'), secretKey)
    } catch (err) {
        ctx.throw(401, '请重新登录')
    }
    await next()
}
