const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')

const app = express()
const PORT = config.get('PORT') || process.env.PORT

// app.set('views', __dirname + '/public/views')
// app.set('view engine', 'ejs')
// app.use(express.urlencoded({ extended: true, limit: '50mb' }))
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

app.use('/',require('./routes/sales'))


