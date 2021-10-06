const mongoose = require('mongoose')
const Currency = require('../models/currencies')
const Sales = require('../models/sales')
const fs = require('fs')
const csv = require('csv-parser')
const { allDates } = require('../dateExtraction')
const { patterns } = require('../patterns')
const axios = require('axios')
const config = require('config')
const upload = require('../multer-setup/setup')


const postRequestAddSales = (req,res) =>{
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
                const results = []
                fs.createReadStream(req.file.path)
                .pipe(csv({
                    skipLines: 7
                }))
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    let { store } = req.body
                    let tempMonths = []
                    let shortMonths = []
                    let tempMarkets = {}

                    let market_places = await Currency.find().select(['market_place','currency'])
                    market_places.forEach( element => {
                        tempMarkets = {
                            ...tempMarkets,
                            [element['market_place']] : element['currency']
                        }
                    })

                    results.forEach(element => {
                        let [,month,year,indexMonth] = ((allDates[store])(element[patterns[store]['date']]))
                        let tempDate = `${year}-${indexMonth}`
                        tempMonths.includes(tempDate) ? '' : tempMonths.push(tempDate)
                        shortMonths.includes(month) ? '' : shortMonths.push(month)
                    })


                    Promise.all(
                        tempMonths.map(async (element,i) => {
                            let date = `${element}-01`
                            let base = 'USD';
                            let response = await axios.get(`https://api.exchangeratesapi.io/v1/${date}?access_key=${config.get('exchangeApiKey')}&base=${base}`)
                            return {
                                [shortMonths[i]]: response.data.rates
                            } 
                        })
                    ).then(resolvedValues => {

                        let tempRates = {"":""}
                        resolvedValues.forEach(element => {
                            tempRates = {
                                ...tempRates,
                                [(Object.keys(element))[0]] : element[(Object.keys(element))[0]]
                            }
                        })

                        let data = results.map((element,i) => {
                            let [day,month,year] = ((allDates[store])(element[patterns[store]['date']]))
                            let tempMarketPlace = (element[patterns[store]['marketplace']]).toLowerCase()
                            let tempCurrency
                            let tempUSD
                            Object.keys(tempMarkets).includes(tempMarketPlace) ? 
                                tempCurrency = tempMarkets[tempMarketPlace] : tempCurrency = ""
                            Object.keys(tempRates[month]).includes(tempCurrency) ? 
                                tempUSD = tempRates[month][tempCurrency] : tempUSD = ""

                            let { type, sku, quantity, marketplace, product_sales, total } = patterns[store]
                            let product_sales_usd = Number(element[product_sales] * tempUSD).toFixed(2)
                            let total_usd = Number(element[total] * tempUSD).toFixed(2)
                            tempUSD = Number(tempUSD).toFixed(2) 
                            return {
                                dd: day,
                                mmm: month,
                                yyyy: year,
                                type: element[type],
                                sku: element[sku],
                                quantity: element[quantity],
                                marketplace: element[marketplace],
                                product_sales: element[product_sales],
                                total: element[total],
                                currency: tempCurrency,
                                rate_to_usd: `${tempUSD}`,
                                product_sales_usd : `${product_sales_usd}`,
                                total_usd: `${total_usd}`
                            }
                    })

                        res.status(200).json({length: data.length, result: data})


                    })
                    .catch(err => res.status(400).json({ message : err.message}))
                
                    
                    
            })
            }
        })
        
}catch(err){
    res.status(400).json({ message : err.message})
}

}

const requestAddSales = (req,res)=>{
    const { records } = req.body 
    Sales.insertMany(records).then(docs => {
        res.status(201).json({message: 'Sales added successfully', docs})
    }).catch(err => res.status(400).json({message: err.message}))
}

module.exports = { postRequestAddSales, requestAddSales }