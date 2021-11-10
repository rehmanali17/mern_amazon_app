const router = require('express').Router()
const { check } = require('express-validator')
const { AddSellerAccount, GetSellerAccounts } = require('../../controllers/seller-account/seller-account-controller')


router.post('/add-seller-account',[
    check('seller_account','Enter a valid seller account').notEmpty()
],AddSellerAccount)

router.get('/get-seller-accounts',GetSellerAccounts)

module.exports = router