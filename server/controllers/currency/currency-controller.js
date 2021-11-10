const mongoose = require('mongoose')
const Currency = require('../../models/currency/currency')
const config = require('config')

const AddCurrency = async (req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json(errors.array())
        }else{
            let { store, currency } = req.body
            let docs = await Currency.find({store})
            if(docs.length > 0){
                res.status(400).json([{ msg: 'Currency already added for this store'}])
            }else{
                const newCurrency = new Currency({
                    store,
                    currency
                })
                newCurrency.save().then(currency => {
                    res.status(201).json([{ msg: 'Currency successfully added' , result: currency }])
                }).catch(err => {
                    res.status(400).json([{ msg: 'Currency addition error', error: err }])
                })
            }
        }
    }catch(error){
        res.status(400).json([{ msg: 'Currency addition error', error:error.message}])
    }
}

const GetCurrencies = async (req,res) => {
    try{
        let response = await Currency.find().select('-__v')
        let results = {
            length: response.length,
            currencies: response.map(element => {
                return {
                    _id: element._id,
                    store: element.store,
                    currency: element.currency,
                    date: element.date_added,
                    requests: {
                        DELETE: `${config.get('baseURL')}/currency/single-currency/${element._id}`
                    } 
                }
            })
        }
        res.status(200).json(results)
    }catch(error){
        res.status(400).json({ message: 'Error fetching the currencies' })
    }
    
}

const DeleteSingleCurrency = async (req,res)=>{
    try{
        const { id } = req.params
        if(mongoose.Types.ObjectId.isValid(id)){
            await Currency.findByIdAndDelete(id)
            res.status(200).json({msg: "Currency deleted successfully"})
        }else{
            res.status(400).json({msg: "Invalid store id"})
        }   
    }catch(error){
        res.status(400).json({
            msg: 'Error deleting the currency'
        })
    }
}

const DeleteAllCurrency = async (req,res)=>{
    try{
        await Currency.deleteMany({})
        res.status(200).json({msg: "All Currencies deleted successfully"}) 
    }catch(error){
        res.status(400).json({
            msg: 'Error deleting the currencies',
            error:error.message
        })
    }
}


module.exports = { AddCurrency, GetCurrencies, DeleteSingleCurrency, DeleteAllCurrency }
