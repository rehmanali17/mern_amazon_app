const router = require('express').Router()
const { postRequestAddCurrency, getAllCurrencies, deleteSingleCurrency, deleteAllCurrency } = require('../controllers/Currency')

router.get('/currency-list', getAllCurrencies)

router.post('/add-currency',postRequestAddCurrency)

router.delete('/single-currency/:id', deleteSingleCurrency)

router.delete('/all-currency', deleteAllCurrency)

module.exports = router