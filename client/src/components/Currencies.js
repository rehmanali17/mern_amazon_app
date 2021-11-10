import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Currencies = () => {
    const [loading, setLoading] = useState(true)
    const [currency, setCurrency] = useState([])
    const [message, setMessage] = useState('')

    useEffect(()=>{
        (async()=>{
            let response = await axios.get('https://amazon-sellers-app.herokuapp.com/currency/currency-list')
            // let response = await axios.get('http://localhost:5000/currency/currency-list')
            setCurrency(response.data.currencies)
            setLoading(false)
        })()
    },[])

    const deleteSingleCurrency = async(id)=>{
        try{
            let response = await axios.delete(`https://amazon-sellers-app.herokuapp.com/currency/single-currency/${id}`)
            // let response = await axios.delete(`http://localhost:5000/currency/single-currency/${id}`)
            setMessage(response.data.message)
            setCurrency(currency.filter(curr => id !== curr._id))
        }catch(err){
            setMessage(err.response.data.message)
        }
    }

    const deleteAllCurrency = async()=>{
        try{
            let response = await axios.delete('https://amazon-sellers-app.herokuapp.com/currency/all-currency')
            // let response = await axios.delete('http://localhost:5000/currency/all-currency')
            setMessage(response.data.message)
            setCurrency([])
        }catch(err){
            setMessage(err.response.data.message)
        }
    }

    return loading === true ? <div className="App">Loading....</div> :  (
        <Fragment>
            { currency.length === 0  ? <div className="App">No Currencies added</div> : <div className="App">
            <br />
            {message !== '' && <p>{message}</p>}
            <br />
            <button onClick={deleteAllCurrency}>Delete All Currencies</button>
            <br /><br />
            <table border="1">
                <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Store</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>  
            {currency.map(element => {
                return (
                    <tr key={element._id}>
                        <td><button onClick={()=> {deleteSingleCurrency(element._id)}}>Delete</button></td>
                        <td>{((element.store).replace('Store',"")).toUpperCase()}</td>
                        <td>{element.currency}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            <br/>
            <br/>
            <br/>
            <br/>
        </div> }
        <Link to="/">Home</Link>
    </Fragment>
        
    )
}

export default Currencies
