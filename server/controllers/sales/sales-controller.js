const mongoose = require('mongoose')
const Sales = require('../../models/sales/sales')
const Currency = require('../../models/currency/currency')
const fs = require('fs')
const csv = require('csv-parser')
const { allDates } = require('../../utils/date-extraction')
const { patterns } = require('../../utils/patterns')
const { functionPatterns } = require('../../utils/function-patterns')
const axios = require('axios')
const config = require('config')
const upload = require('../../multer-setup/setup')

const GetSales = async (req,res) => {
    try{
        const { customer, seller_account } = req.query
        let docs = await Sales.find({account_holder:{customer,seller_account}}).select('-__v')
        let results = {
            length: docs.length,
            sales: docs.map(doc => {
                return {
                    id: doc._id,
                    dd: doc.dd,
                    mmm: doc.mmm,
                    yyyy: doc.yyyy,
                    type: doc.type,
                    sku: doc.sku,
                    quantity: doc.quantity,
                    marketplace: doc.marketplace,
                    product_sales: doc.product_sales,
                    total: doc.total,
                    currency: doc.currency,
                    rate_to_usd: doc.rate_to_usd,
                    product_sales_usd: doc.product_sales_usd,
                    total_usd: doc.total_usd,
                    requests: {
                        DELETE: `${config.get('baseURL')}/sales/delete-single-sale/${doc._id}`
                    }
                }
            })
        }
        
        res.status(200).json(results)
    }catch(error){
        res.status(400).json({ message: 'Error fetching the sales' })
    }
    
}

const MapSales = (req,res) =>{
    try{
        upload(req,res, (err)=>{
            if(err){
                let error = err.message != undefined ? err.message : err
                res.status(400).json({
                    message: 'Error saving the file! ' + error
                })
            }else if(req.file == undefined){
                res.status(400).json({
                    message : 'Error! No file selected',
                })
            }else{
                const { customer, seller_account } = req.query
                const results = []
                fs.createReadStream(req.file.path)
                .pipe(csv({
                    skipLines: 7
                }))
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    let { store } = req.body
                    let conversionApiCallDates = []
                    let monthsWithCurrencies = []
                    let storeCurrencies = {}

                    let stores = await Currency.find({store}).select(['store','currency'])
                if(stores.length > 0){
                    stores.forEach( element => {
                        storeCurrencies = {
                            ...storeCurrencies,
                            [element['store']] : element['currency']
                        }
                    })

                    results.forEach(element => {
                        // Getting date from the object mapping in the pattern.js file
                        let [,month,year,indexMonth] = ((allDates[store])(element[patterns[store]['date']]))
                        let tempDate = `${year}-${indexMonth}`

                        conversionApiCallDates.includes(tempDate) ? '' : conversionApiCallDates.push(tempDate)

                        monthsWithCurrencies.includes(month) ? '' : monthsWithCurrencies.push(month)
                    })

                    Promise.all(
                        conversionApiCallDates.map(async (element,i) => {
                            let apiCallDate = `${element}-01`
                            let base = storeCurrencies[store];
                            let response = await axios.get(`https://api.exchangeratesapi.io/v1/${apiCallDate}?access_key=${config.get('exchangeApiKey')}&base=${base}`)
                            return {
                                [monthsWithCurrencies[i]]: response.data.rates
                            } 
                        })
                    ).then(resolvedValues => {
                        let monthlyRates = {}
                        resolvedValues.forEach(element => {
                            monthlyRates = {
                                ...monthlyRates,
                                [(Object.keys(element))[0]] : element[(Object.keys(element))[0]]
                            }
                        })

                        let data = results.map((element,i) => {
                            let [day,month,year] = ((allDates[store])(element[patterns[store]['date']]))
                            let tempCurrency = 'USD'
                            let tempUSD = monthlyRates[month][tempCurrency]
                    
                            let { type, sku, quantity, marketplace, product_sales, total } = patterns[store]

                            let product_sales_usd = Number(parseFloat((functionPatterns[store])(element[product_sales])) * tempUSD).toFixed(2)

                            let total_usd = Number(parseFloat((functionPatterns[store])(element[total])) * tempUSD).toFixed(2)

                            tempUSD = Number(tempUSD).toFixed(2)

                            return {
                                account_holder:{
                                    customer,
                                    seller_account
                                },
                                dd: day,
                                mmm: month,
                                yyyy: year,
                                type: element[type],
                                sku: element[sku],
                                quantity: Number(element[quantity]),
                                marketplace: element[marketplace],
                                product_sales: Number((functionPatterns[store])(element[product_sales])),
                                total: Number((functionPatterns[store])(element[total])),
                                currency: storeCurrencies[store],
                                rate_to_usd: Number(tempUSD),
                                product_sales_usd : Number(product_sales_usd),
                                total_usd: Number(total_usd)
                            }
                    })
                        res.status(200).json({length: data.length, result: data})

                    })
                    .catch(err => res.status(400).json({ message : err.message}))
                
                }else{
                    res.status(400).json({ message : 'Currency does not exist for this store'})
                }
                    
                    
            })
            }
        })
        
}catch(err){
    res.status(400).json({ message : err.message})
}

}

const AddSales = (req,res)=>{
    const { records } = req.body 
    Sales.insertMany(records).then(docs => {
        res.status(201).json({message: 'Sales added successfully', docs})
    }).catch(err => res.status(400).json({message: err.message}))
}


const DeleteSingleSale = async (req,res)=>{
    try{
        const { id } = req.params
        if(mongoose.Types.ObjectId.isValid(id)){
            await Sales.findByIdAndDelete(id)
            res.status(200).json({message: "Sale deleted successfully"})
        }else{
            res.status(300).json({message: "Invalid sale id"})
        }   
    }catch(error){
        console.log(error.message)
        res.status(300).json({
            message: 'Error deleting the sale'
        })
    }
}

const DeleteAllSales = async (req,res)=>{
    try{
        await Sales.deleteMany({})
        res.status(200).json({message: "All Sales deleted successfully"}) 
    }catch(error){
        console.log(error.message)
        res.status(300).json({
            message: 'Error deleting the sales'
        })
    }
}

const getGroupedSales = async(req,res)=>{

    try {

        // const years = await Sales.distinct('yyyy')
        // let months = years.map(async year => {
        //     return await Sales.distinct('mmm' , {'yyyy': year})
        // })
        // Promise.all(months)
        //     .then( async resolvedValues => {
        //         const sales = await Sales.aggregate([
        //             { $match: {} },
        //             { $group: { 
        //                 _id: {mmm: "$mmm", yyyy: "$yyyy", sku: "$sku" },
        //                 quantity_sum: { $sum: "$quantity"},
        //                 product_sales_usd_sum: { $sum: "$product_sales_usd"},
        //                 total_usd_sum: { $sum: "$total_usd"} 
        //             }},
        //             { $sort:{ _id: -1 }}
        //         ])
        //         res.status(200).json({years, months: resolvedValues,  sales})
        //     })
        //     .catch(err => res.status(400).json({message: err.message})) 
        
        
        const sales = await Sales.aggregate([
            { $match: {} },
            { $group: { 
                _id: {mmm: "$mmm", yyyy: "$yyyy", sku: "$sku" },
                quantity_sum: { $sum: "$quantity"},
                product_sales_usd_sum: { $sum: "$product_sales_usd"},
                total_usd_sum: { $sum: "$total_usd"} 
            }},
            { $sort:{ _id: -1 }}
        ])
        let years = {} 
        sales.forEach(sale => {
            let tempYear = sale['_id']['yyyy']
            let tempMonth = sale['_id']['mmm']
            if(Object.keys(years).includes(tempYear)){
                if(!years[tempYear].includes(tempMonth)){
                    years[tempYear].push(tempMonth)
                }
            }else{
                years[tempYear] = []
                years[tempYear].push(tempMonth) 
            }
        })
        res.status(200).json({years,sales}) 
        

        // Sales.count()
        // .then(sales => 
        //     // sales.map()
            
        // )
        // .catch(err => res.status(400).json({message: err.message}))
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { GetSales, MapSales, AddSales, DeleteSingleSale, DeleteAllSales }

