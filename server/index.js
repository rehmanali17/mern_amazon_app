const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || config.get('PORT')


app.use(express.json({ extended: true, limit: '5mb' }))
app.use(cors())

mongoose.connect(config.get('mongoURi'), {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log('Database Connected')
        app.listen(PORT, () => console.log(`Server Running at PORT ${PORT}`))
    })
    .catch(err => {
        console.log(err.message)
        process.exit(1)
    })

app.use('/auth',require('./routes/auth/auth-routes'))    
app.use('/customer',require('./routes/customer/customer-routes'))    
app.use('/seller',require('./routes/seller-account/seller-account')) 
app.use('/currency',require('./routes/currency/currency'))   
app.use('/sales',require('./routes/sales/sales'))


