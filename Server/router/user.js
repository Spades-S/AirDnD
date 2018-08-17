// Created by Spades<spadesge@gmail.com> on 18/06/13

const jwt = require('jsonwebtoken')
const { baseURL, secretKey } = require('../config/index')
const { checkLogin, findMailBox, forgetPassword, updateMailBox, updatePassword } = require('../controller/user')

function login(router) {
    router.post(`${baseURL}/user`, async (ctx) => {
        try {
            await checkLogin(ctx.request.body)
        } catch (err) {
            switch (err.message) {
                case '0':
                    ctx.throw(401, '验证码错误')
                    break
                case '1':
                    ctx.throw(401, '用户名或密码错误')
                    break
                default:
                    break
            }
        }
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
            data: 'admin'
        }, secretKey)
        ctx.cookies.set('TOKEN', token, {
            httpOnly: false
        })
        ctx.body = 'success'
    })
}

function updatePSW(router, verify) {
    router.put(`${baseURL}/user`, verify, async (ctx) => {
        try {
            await updatePassword(ctx.request.body)
        } catch (err) {
            switch (err.message) {
                case '0':
                    ctx.throw(401, '验证码错误')
                    break
                case '1':
                    ctx.throw(401, '原密码输入错误')
                    break
                case '2':
                    ctx.throw(500)
                    break
                default:
                    break
            }
        }
        ctx.body = 'success'
    })
}

function getMailBox(router) {
    router.get(`${baseURL}/user/mailbox`, async (ctx) => {
        let mailbox = ''
        try {
            mailbox = await findMailBox()
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = mailbox
    })
}

function updateMB(router, verify) {
    router.put(`${baseURL}/user/mailbox`, verify, async (ctx) => {
        try {
            await updateMailBox(ctx.request.body)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = 'success'
    })
}

function forget(router) {
    router.post(`${baseURL}/user/forget`, async (ctx) => {
        try {
            forgetPassword()
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = 'success'
    })
}

module.exports = {
    init(router, verify) {
        forget(router)
        getMailBox(router, verify)
        login(router)
        updateMB(router, verify)
        updatePSW(router, verify)
    }
}
