// Created by Spades<spadesge@gmail.com> on 18/06/06

const path = require('path')
const shell = require('shelljs')

const { Sales } = require('../model/index')
const { assetBasePath } = require('../config/index')

async function addItem(data) {
    const id = (new Date()).getTime()
    const { fields, files } = data
    let { info } = fields
    info = JSON.parse(info)
    const sale = {
        id,
        info,
        cover: { url: '' },
        imgs: [],
        vedio: { url: '' }
    }

    Object.keys(files).forEach((item) => {
        switch (item) {
            case 'vedio':
                shell.mv(files[item].path, path.resolve(assetBasePath, `./vedio/${id}.mp4`))
                sale.vedio = { url: `./vedio/${id}.mp4` }
                break
            case 'cover':
                shell.mv(files[item].path, path.resolve(assetBasePath, `./cover/${id}.png`))
                sale.cover = { url: `./cover/${id}.png` }
                break
            default:
                shell.mv(files[item].path, path.resolve(assetBasePath, `./imgs/${id}-${item}.png`))
                sale.imgs.push({ url: `./imgs/${id}-${item}.png` })
                break
        }
    })

    const saleItem = new Sales(sale)

    try {
        await saleItem.save()
    } catch (err) {
        console.log(`[controller/sale.js err]  ${err}`)
        throw err
    }
    return id
}

async function deleteItemById(id) {
    await Sales.findOneAndDelete({ id }).exec()
}

async function getItemById(id) {
    const res = await Sales.findOne({ id }).exec()
    return res
}

async function getTotalNum() {
    const res = await Sales.find({}, 'id').exec()
    return res.length
}

async function getResByPage(page) {
    const res = await Sales.find({}, 'id cover info.zh.name info.zh.price info.zh.intro info.en.name info.en.price info.en.intro info.jp.name info.jp.price info.jp.intro ').sort({ id: 'desc' }).skip((page - 1) * 6).limit(6)
        .exec()
    return res
}

async function updateItemById(id, data) {
    const { fields, files } = data
    const imgs = []
    const update = {}
    Object.keys(fields).forEach((item) => {
        if (/^img/.test(item)) {
            shell.mv(path.resolve(assetBasePath, fields[item]), path.resolve(assetBasePath, `./imgs/${id}-${item}.png`))
            imgs.push({
                url: `./imgs/${id}-${item}.png`
            })
        } else {
            console.log(item)
            update[item] = JSON.parse(fields[item])
        }
    })
    Object.keys(files).forEach((item) => {
        switch (item) {
            case 'vedio':
                shell.mv(files[item].path, path.resolve(assetBasePath, `./vedio/${id}.mp4`))
                update[item] = { url: `./vedio/${id}.mp4` }
                break
            case 'cover':
                shell.mv(files[item].path, path.resolve(assetBasePath, `./cover/${id}.png`))
                update[item] = { url: `./cover/${id}.png` }
                break
            default:
                shell.mv(files[item].path, path.resolve(assetBasePath, `./imgs/${id}-${item}.png`))
                imgs.push({ url: `./imgs/${id}-${item}.png` })
                break
        }
    })

    update.imgs = imgs
    await Sales.findOneAndUpdate({ id }, update).exec()
}


module.exports = {
    addItem,
    deleteItemById,
    getItemById,
    getTotalNum,
    getResByPage,
    updateItemById
}
