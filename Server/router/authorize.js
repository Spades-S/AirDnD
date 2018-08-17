// Created by Spades<spadesge@gmail.com> on 18/06/13

const { baseURL } = require('../config/index')

function authorize(router, verify) {
    router.get(`${baseURL}/authorize`, verify, (ctx) => {
        ctx.body = 'success'
    })
}

module.exports = {
    init(router, verify) {
        authorize(router, verify)
    }
}
