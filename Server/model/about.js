// Created by Spades<spadesge@gmail.com> on 18/06/12

const mongoose = require('mongoose')

const { Schema } = mongoose

const AboutSchema = new Schema({
    id: {
        unique: true,
        type: Number
    },
    info: {
        zh: {
            about: String
        },
        en: {
            about: String
        },
        jp: {
            about: String
        }
    }
})
mongoose.model('About', AboutSchema)
