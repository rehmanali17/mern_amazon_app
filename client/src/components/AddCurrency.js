import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AddCurrency = () => {
    const [formData, setFormData] = useState({
        market_place: '',
        currency: ''
    })
    const [result, setResult] = useState('')
    const { market_place, currency } =  formData

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
         }
        try{
            let response = await axios.post('http://localhost:5000/add-currency',formData,config)
            // console.log(response)
            setResult(response.data.message)
        }catch(err){
            setResult(err.response.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="market_place" value={market_place} onChange={handleChange} placeholder="Market Place"/><br/><br/>
                <input type="text" placeholder="Currency" name="currency" onChange={handleChange} value={currency} /><br/><br/>
                <input type="submit" value="Add" />
            </form>
            <p>{result}</p>
                <br/>
                <br/>
            <Link to="/">Home</Link>
        </div>
    )
}

export default AddCurrency
