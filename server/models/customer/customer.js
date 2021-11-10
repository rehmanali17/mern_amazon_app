const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const customerSchema = new Schema({
    name:String,
    jurisdiction:String,
    url:String,
    date_created:{
        type:String,
        default: moment().format('DD-MM-YYYY')
    }
})

module.exports = mongoose.model('customer',customerSchema)