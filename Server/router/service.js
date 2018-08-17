// Created by Spades<spadesge@gmail.com> on 18/06/26


const { baseURL } = require('../config/index')
const {
    addItem, deleteItem, getGuide, getAbout, updateItem
} = require('../controller/service')

function getGuideServices(router) {
    router.get(`${baseURL}/services/guide`, async (ctx) => {
        const order = ['hotel', 'driver', 'kimono', 'ticket', 'restaurant', 'performance', 'photos', 'medical', 'estate', 'investment']
        const res = {
            hotel: [],
            driver: [],
            kimono: [],
            ticket: [],
            restaurant: [],
            performance: [],
            photos: [],
            medical: [],
            estate: [],
            investment: []
        }
        try {
            const source = await getGuide()
            source.forEach((item) => {
                if (item.type < 10) {
                    res[order[item.type]].push(item)
                }
            })
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = res
    })
}

function getAboutServices(router) {
    router.get(`${baseURL}/services/about`, async (ctx) => {
        const res = []

        try {
            const source = await getAbout()
            source.forEach((item) => {
                res.push(item)
            })
        } catch (err) {
            console.log(err)
            ctx.throw(500)
        }
        ctx.body = res
    })
}

function addServiceItem(router, verify) {
    router.post(`${baseURL}/services`, verify, async (ctx) => {
        try {
            await addItem(ctx.request.body)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = 'success'
    })
}

function updateServiceItem(router, verify) {
    router.put(`${baseURL}/services/:id`, verify, async (ctx) => {
        const { id } = ctx.params
        try {
            await updateItem(id, ctx.request.body)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = 'success'
    })
}

function deleteServiceItem(router, verify) {
    router.delete(`${baseURL}/services/:id`, verify, async (ctx) => {
        const { id } = ctx.params
        try {
            await deleteItem(id)
        } catch (err) {
            ctx.throw(500)
        }
        ctx.body = 'success'
    })
}

module.exports = {
    init(router, verify) {
        addServiceItem(router, verify)
        deleteServiceItem(router, verify)
        getGuideServices(router)
        getAboutServices(router)
        updateServiceItem(router, verify)
    }
}