const router = require('express').Router()
const { GetSales, MapSales, AddSales, DeleteSingleSale, DeleteAllSales, GetSumSales, GetDistinctYears, GetVolumeWeightedSales } = require('../../controllers/sales/sales-controller')
const auth = require('../../middleware/auth/auth')


router.get('/get-sales',auth,GetSales)

router.post('/map-sales',auth,MapSales)

router.post('/add-sales',auth,AddSales)

router.delete('/delete-single-sale/:id',auth, DeleteSingleSale)

router.delete('/delete-all-sales',auth, DeleteAllSales)

router.get('/get-distinct-years',auth,GetDistinctYears)

router.get('/get-sum-sales', GetSumSales)

router.get('/get-volume-weighted-sales', GetVolumeWeightedSales)

module.exports = router