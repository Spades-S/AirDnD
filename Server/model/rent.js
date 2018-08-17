// Created by Spades<spadesge@gmail.com> on 18/06/11

const mongoose = require('mongoose')

const { Schema } = mongoose

const RentScheme = new Schema({
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
            inner: String,
            transport: String,
            around: String,
            facility: String,
            notes: String,
            phone: String,
            rentInfo: {
                house: String,
                person: String,
                bed: String
            }
        },
        en: {
            name: String,
            price: String,
            addr: String,
            intro: String,
            inner: String,
            transport: String,
            around: String,
            facility: String,
            notes: String,
            phone: String,
            rentInfo: {
                house: String,
                person: String,
                bed: String
            }
        },
        jp: {
            name: String,
            price: String,
            addr: String,
            intro: String,
            inner: String,
            transport: String,
            around: String,
            facility: String,
            notes: String,
            phone: String,
            rentInfo: {
                house: String,
                person: String,
                bed: String
            }
        }
    }
})

mongoose.model('Rent', RentScheme)
