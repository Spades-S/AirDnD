// Created by Spades<spadesge@gmail.com> on 18/06/05

const Mongoose = require('mongoose')
const { db } = require('../config/mongodb')

Mongoose.connect(`mongodb://localhost/${db}`, (err) => {
    if (err) {
        console.log(`[mongoose err]   ${err}`)
        throw err
    }
})

require('./about')
require('./guide')
require('./sale')
require('./rent')
require('./user')
require('./service')

module.exports = {
    Sales: Mongoose.model('Sale'),
    Rents: Mongoose.model('Rent'),
    Guide: Mongoose.model('Guide'),
    About: Mongoose.model('About'),
    User: Mongoose.model('User'),
    Services: Mongoose.model('Service')
}

