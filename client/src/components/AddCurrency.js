import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AddCurrency = () => {
    const [formData, setFormData] = useState({
        currency: '',
        store: 'ukStore'
    })
    const [result, setResult] = useState('')
    const { store, currency } = formData

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(formData)
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
         }
        try{
            let response = await axios.post('https://amazon-sellers-app.herokuapp.com/currency/add-currency',formData,config)
            // let response = await axios.post('http://localhost:5000/currency/add-currency',formData,config)
            setResult(response.data.message)
        }catch(err){
            setResult(err.response.data.message)
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <select name="store" value={store} onChange={handleChange}>
                    <option value="ukStore">UK</option>
                    <option value="usStore">USA</option>
                    <option value="esStore">SP</option>
                    <option value="itStore">IT</option>
                    <option value="caStore">CA</option>
                    <option value="mxStore">MX</option>
                    <option value="geStore">GE</option>
                    <option value="frStore">FR</option>
                    <option value="nlStore">NL</option>
                    <option value="bzStore">BZ</option>
                    <option value="swStore">SW</option>
                    <option value="tkStore">TK</option>
                    <option value="poStore">PO</option>
                </select><br /><br/>
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
