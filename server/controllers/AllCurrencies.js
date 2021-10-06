const mongoose = require('mongoose')
const Currency = require('../models/currencies')

const getAllCurrencies = async (req,res) => {
    try{
        let response = await Currency.find().select('-__v')
        let results = {
            length: response.length,
            currencies: response.map(element => {
                return {
                    _id: element._id,
                    market_place: element.market_place,
                    currency: element.currency,
                    date: element.date_added 
                }
            })
        }
        res.status(200).json(results)
    }catch(error){
        res.status(400).json({ message: 'Error fetching the currencies' })
    }
    
}

module.exports = { getAllCurrencies }
