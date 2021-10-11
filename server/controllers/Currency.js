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
                    date: element.date_added,
                    requests: {
                        DELETE: `http://localhost:5000/currency/single-currency/${element._id}`
                    } 
                }
            })
        }
        res.status(200).json(results)
    }catch(error){
        res.status(400).json({ message: 'Error fetching the currencies' })
    }
    
}

const deleteSingleCurrency = async (req,res)=>{
    try{
        const { id } = req.params
        if(mongoose.Types.ObjectId.isValid(id)){
            await Currency.findByIdAndDelete(id)
            res.status(200).json({message: "Marketplace deleted successfully"})
        }else{
            res.status(400).json({message: "Invalid marketplace id"})
        }   
    }catch(error){
        console.log(error.message)
        res.status(400).json({
            message: 'Error deleting the marketplace'
        })
    }
}

const deleteAllCurrency = async (req,res)=>{
    try{
        await Currency.deleteMany({})
        res.status(200).json({message: "All Marketplaces deleted successfully"}) 
    }catch(error){
        console.log(error.message)
        res.status(400).json({
            message: 'Error deleting the marketplaces'
        })
    }
}


module.exports = { postRequestAddCurrency, getAllCurrencies, deleteSingleCurrency, deleteAllCurrency }
