// Created by Spades<spadesge@gmail.com> on 18/06/13

const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    id: {
        unique: true,
        type: Number
    },
    username: String,
    password: String,
    mailbox: String,
    verifycode: String
})

mongoose.model('User', UserSchema)
