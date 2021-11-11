const router = require('express').Router()
const { AddCurrency, GetCurrencies, DeleteSingleCurrency, DeleteAllCurrency } = require('../../controllers/currency/currency-controller')
const auth = require('../../middleware/auth/auth')
const { check } = require('express-validator')

router.get('/get-currencies',auth,GetCurrencies)

router.post('/add-currency',auth,[
    check('store', 'Enter a valid store').notEmpty(),
    check('currency', 'Enter a valid currency').notEmpty()
],AddCurrency)

router.delete('/single-currency/:id',auth, DeleteSingleCurrency)

router.delete('/all-currency', auth, DeleteAllCurrency)

module.exports = router