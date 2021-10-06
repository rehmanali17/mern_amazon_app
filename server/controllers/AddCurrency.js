const mongoose = require('mongoose')
const Currency = require('../models/currencies')

const postRequestAddCurrency = async (req,res) => {
    try{
        let { market_place, currency } = req.body
        market_place = market_place.toLowerCase()
        let response = await Currency.findOne({market_place})
        if(response !== null){
            res.status(400).json({ message: 'Market place already added'})
        }else{
            const newCurrency = new Currency({
                market_place,
                currency
            })
            newCurrency.save().then(currency => {
                res.status(201).json({ message: 'Market place successfully added' , result: currency })
            }).catch(err => {
                res.status(400).json({ message: err.message })
            })
        }
    }catch(error){
        res.status(400).json({ message: 'Error adding the Market place' })
    }
    
}

module.exports = { postRequestAddCurrency }
