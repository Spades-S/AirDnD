// Created by Spades<spadesge@gmail.com> on 18/06/25

const mongoose = require('mongoose')

const { Schema } = mongoose

// type 对应关系
//     hotel: 0,
//     driver: 1,
//     kimono: 2,
//     ticket: 3,
//     restaurant: 4,
//     performance: 5,
//     photos: 6,
//     medical: 7,
//     estate: 8,
//     investment: 9

const ServiceSchema = new Schema({
    id: {
        unique: true,
        type: Number
    },
    cover: {
        url: String
    },
    info: {
        zh: {
            intro: String
        },
        en: {
            intro: String
        },
        jp: {
            intro: String
        }
    },
    type: Number
})

mongoose.model('Service', ServiceSchema)
