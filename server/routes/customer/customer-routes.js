const router = require('express').Router()
const { check } = require('express-validator')
const { AddCustomer, GetCustomers } = require('../../controllers/customer/customer-contoller')
const auth = require('../../middleware/auth/auth')

router.post('/add-customer',auth,[
    check('name', 'Enter a valid name').notEmpty(),
    check('jurisdiction', 'Enter a valid jurisdiction').notEmpty(),
    check('url', 'Enter a valid url').notEmpty(),
],AddCustomer)

router.get('/get-customers',auth,GetCustomers )

module.exports = router