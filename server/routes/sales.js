const router = require('express').Router()
const { postRequestAddCurrency } = require('../controllers/AddCurrency')
const { postRequestAddSales, requestAddSales } = require('../controllers/AddSales')
const { getAllCurrencies } = require('../controllers/AllCurrencies')
const { getAllSales } = require('../controllers/AllSales')

router.get('/currency-list', getAllCurrencies)

router.get('/all-sales', getAllSales)



router.post('/add-currency',postRequestAddCurrency)

router.post('/add-sales',postRequestAddSales)

router.post('/add-sales-db',requestAddSales)



module.exports = router