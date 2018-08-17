// Created by Spades<spadesge@gmail.com> on 18/06/05

const mongoose = require('mongoose')

const { Schema } = mongoose

const SaleSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    cover: {
        url: String
    },
    imgs: Array,
    vedio: {
        url: String
    },
    info: {
        zh: {
            name: String,
            price: String,
            addr: String,
            intro: String,
            attribute: String,
            transport: String,
            around: String,
            estate: String,
            phone: String
        },
        en: {
            name: String,
            price: String,
            addr: String,
            intro: String,
            attribute: String,
            transport: String,
            around: String,
            estate: String,
            phone: String
        },
        jp: {
            name: String,
            price: String,
            addr: String,
            intro: String,
            attribute: String,
            transport: String,
            around: String,
            estate: String,
            phone: String
        }
    }
})

mongoose.model('Sale', SaleSchema)

