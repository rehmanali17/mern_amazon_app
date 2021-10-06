const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salesSchema = new Schema({
    dd: String,
    mmm: String,
    yyyy: String,
    type: String,
    sku: String,
    quantity: String,
    marketplace: String,
    product_sales: String,
    total: String,
    currency: String,
    rate_to_usd: String,
    product_sales_usd: String,
    total_usd: String
})

module.exports = mongoose.model('sale',salesSchema)

