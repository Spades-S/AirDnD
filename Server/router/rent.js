// Created by Spades<spadesge@gmail.com> on 18/06/11

const { baseURL } = require('../config/index')
const { addItem, deleteItemById, getItemById, updateItemById } = require('../controller/rent')

function addRentItem(router, verify) {
    router.post(`${baseURL}/rents`, verify, async (ctx) => {
        let id = 0
        try {
            id = await addItem(ctx.request.body)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = {
            id
        }
    })
}

function deleteItem(router, verify) {
    router.delete(`${baseURL}/rents/:id`, verify, async (ctx) => {
        const { id } = ctx.params
        try {
            await deleteItemById(id)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = 'success'
    })
}

function getItem(router) {
    router.get(`${baseURL}/rents/:id`, async (ctx) => {
        const { id } = ctx.params
        let res = null
        try {
            res = await getItemById(id)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = res
    })
}

function updateItem(router, verify) {
    router.put(`${baseURL}/rents/:id`, verify, async (ctx) => {
        const { id } = ctx.params
        try {
            await updateItemById(id, ctx.request.body)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = 'success'
    })
}

module.exports = {
    init(router, verify) {
        addRentItem(router, verify)
        deleteItem(router, verify)
        getItem(router)
        updateItem(router, verify)
    }
}