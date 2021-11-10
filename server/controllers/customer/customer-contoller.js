const Customer = require('../../models/customer/customer')
const { validationResult } = require('express-validator');
const config = require('config')

const AddCustomer = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json(errors.array())
        }else{
            const { name, jurisdiction, url } = req.body;
            let extCustomer = await Customer.find({name,jurisdiction,url})
            if(extCustomer.length > 0){
                res.status(400).json([{msg: "Customer has been already added"}]);
            }else{
                let newCustomer = new Customer({
                    name,
                    jurisdiction,
                    url
                })
                newCustomer.save().then(customer => {
                    res.status(201).json([{msg:'Customer successfully added',customer}]);
                })
                .catch(err => {
                    res.status(400).json([{msg:'Customer addition error' ,error:err}])
                })
            }
            
        }
    }
    catch(error){
        res.status(400).json([{
            msg: "Customer addition error",
            error: error.message
        }]);
    }    
}

const GetCustomers = async (req,res)=>{
    try{
        let docs = await Customer.find().select('-__v')
        let customers = docs.map(doc => {
            return {
                _id:doc._id,
                name:doc.name,
                jurisdiction:doc.jurisdiction,
                url:doc.url,
                requests:{
                    ADD: config.get('baseURL')+'/seller/add-seller-account?id='+doc._id+'&name='+doc.name,
                    GET: config.get('baseURL')+'/seller/get-seller-accounts?id='+doc._id+'&name='+doc.name,
                }
            }
        })
        res.status(200).json({customers});
    }catch(error){
        res.status(400).json([{
            msg: "Error retreiving the customers",
            error: error.message
        }]);
    }
}

module.exports = { AddCustomer, GetCustomers }