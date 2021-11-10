const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    date_created: {
        type: String,
        default: moment().format("DD-MM-YYYY")
    }
})

module.exports = mongoose.model('user',userSchema)