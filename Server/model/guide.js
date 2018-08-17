// Created by Spades<spadesge@gmail.com> on 18/06/11

const mongoose = require('mongoose')

const { Schema } = mongoose

const GuideSchema = new Schema({
    id: {
        unique: true,
        type: Number
    },
    info: {
        zh: {
            hotel: String,
            kimono: String,
            driver: String,
            ticket: String,
            restaurant: String,
            performance: String,
            medical: String,
            estate: String,
            investment: String,
            photos: String
        },
        en: {
            hotel: String,
            kimono: String,
            driver: String,
            ticket: String,
            restaurant: String,
            performance: String,
            medical: String,
            estate: String,
            investment: String,
            photos: String
        },
        jp: {
            hotel: String,
            kimono: String,
            driver: String,
            ticket: String,
            restaurant: String,
            performance: String,
            medical: String,
            estate: String,
            investment: String,
            photos: String
        }
    }
})

mongoose.model('Guide', GuideSchema)
