const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')


const currencySchema = new Schema({
    market_place: String,
    currency: String,
    date_added: {
        type: String,
        default: moment().format("DD-MM-YYYY")
    }
})

module.exports = mongoose.model('currencie',currencySchema)