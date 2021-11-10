const router = require('express').Router()
const { GetSales, MapSales, AddSales, DeleteSingleSale, DeleteAllSales } = require('../../controllers/sales/sales-controller')



router.get('/get-sales', GetSales)

router.post('/map-sales',MapSales)

router.post('/add-sales',AddSales)

router.delete('/delete-single-sale/:id', DeleteSingleSale)

router.delete('/delete-all-sales', DeleteAllSales)

// router.get('/get-group-sales', getGroupedSales)

module.exports = router