const router = require('express').Router()
const { AddCurrency, GetCurrencies, DeleteSingleCurrency, DeleteAllCurrency } = require('../../controllers/currency/currency-controller')

router.get('/get-currencies', GetCurrencies)

router.post('/add-currency',AddCurrency)

router.delete('/single-currency/:id', DeleteSingleCurrency)

router.delete('/all-currency', DeleteAllCurrency)

module.exports = router