// Created by Spades<spadesge@gmail.com> on 18/06/12

const { About } = require('../model/index')

async function getData() {
    const res = await About.find({ id: 0 }).exec()
    return res
}

async function updateData(data) {
    let { fields: { info } } = data
    info = JSON.parse(info)
    if (!(await About.findOneAndUpdate({ id: 0 }, { info }).exec())) {
        const about = new About({
            id: 0,
            info
        })
        await about.save()
    }
}

module.exports = {
    getData,
    updateData
}