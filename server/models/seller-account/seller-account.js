const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const sellerSchema = new Schema({
    seller_account: String,
    customer:{
        id:String,
        name:String
    },
    date_created:{
        type:String,
        default: moment().format('DD-MM-YYYY')
    }
})

module.exports = mongoose.model('seller',sellerSchema)