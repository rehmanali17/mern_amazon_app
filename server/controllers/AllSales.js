const mongoose = require('mongoose')
const Sales = require('../models/sales')

const getAllSales = async (req,res) => {
    try{
        let response = await Sales.find().select('-__v')
        res.status(200).json({result: response})
    }catch(error){
        res.status(400).json({ message: 'Error fetching the sales' })
    }
    
}

module.exports = { getAllSales }
