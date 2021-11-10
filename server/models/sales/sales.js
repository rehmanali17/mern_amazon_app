const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const salesSchema = new Schema({
    account_holder:{
        customer: String,
        seller_account:String
    },
    dd: String,
    mmm: String,
    yyyy: String,
    type: String,
    sku: String,
    quantity: Number,
    marketplace: String,
    product_sales: Number,
    total: Number,
    currency: String,
    rate_to_usd: Number,
    product_sales_usd: Number,
    total_usd: Number,
    date_created:{
        type:String,
        default:moment().format('DD-MM-YYYY')
    }
})

module.exports = mongoose.model('sale',salesSchema)

