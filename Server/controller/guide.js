// Created by Spades<spadesge@gmail.com> on 18/06/11

const { Guide } = require('../model/index')

async function getData() {
    const res = await Guide.find({ id: 0 }).exec()
    return res
}

async function updateData(data) {
    let { fields: { info } } = data
    info = JSON.parse(info)
    if (!(await Guide.findOneAndUpdate({ id: 0 }, { info }).exec())) {
        const guide = new Guide({
            id: 0,
            info
        })
        await guide.save()
    }
}

module.exports = {
    getData,
    updateData
}