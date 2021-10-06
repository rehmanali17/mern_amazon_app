import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Currencies = () => {
    const [currency, setCurrency] = useState([])

    useEffect(()=>{
        (async()=>{
            let response = await axios.get('http://localhost:5000/currency-list')
            console.log(response)
            setCurrency(response.data.currencies)
        })()
    })
    return currency.length === 0 ? <div>Loading....</div> :  (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Market Place</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>  
            {currency.map(element => {
                return (
                    <tr key={element._id}>
                        <td>{element.market_place}</td>
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
            <Link to="/">Home</Link>
        </div>
    )
}

export default Currencies
