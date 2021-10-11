const router = require('express').Router()
const { postRequestAddSales, requestAddSales, getAllSales, deleteSingleSale, deleteAllSales } = require('../controllers/Sales')



router.get('/all-sales', getAllSales)

router.post('/add-sales',postRequestAddSales)

router.post('/add-sales-db',requestAddSales)

router.delete('/single-sale/:id', deleteSingleSale)

router.delete('/all-sales', deleteAllSales)

module.exports = router