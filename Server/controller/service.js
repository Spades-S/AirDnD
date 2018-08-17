// Created by Spades<spadesge@gmail.com> on 18/06/26

const shelljs = require('shelljs')
const path = require('path')
const { assetBasePath } = require('../config/index')
const { Services } = require('../model/index')


async function addItem(data) {
    const { fields: { type }, files: { cover } } = data
    let { fields: { info } } = data
    const id = (new Date()).getTime()
    info = JSON.parse(info)
    shelljs.mv(cover.path, path.resolve(assetBasePath, `./service/${id}.png`))
    const service = new Services({
        id,
        info,
        cover: {
            url: `./service/${id}.png`
        },
        type
    })
    await service.save()
}


async function getGuide() {
    const res = await Services.find({ type: { $gte: 0, $lte: 9 } }).exec()
    return res
}

async function getAbout() {
    const res = await Services.find({ type: 10 }).exec()
    return res
}

async function updateItem(id, data) {
    const { files: { cover } } = data
    let { fields: { info } } = data

    if (cover) {
        shelljs.mv(cover.path, path.resolve(assetBasePath, `./service/${id}.png`))
    }

    if (info) {
        info = JSON.parse(info)
        await Services.findOneAndUpdate({ id }, { info }).exec()
    }
}

async function deleteItem(id) {
    await Services.findOneAndDelete({ id }).exec()
}

module.exports = {
    addItem,
    deleteItem,
    getAbout,
    getGuide,
    updateItem
}