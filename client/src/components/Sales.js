import axios from 'axios'
import React, { useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import { CSVLink } from "react-csv";
 


const Sales = () => {
    const [results,setResults] = useState([])
    const [error,setError] = useState('')

    useEffect(()=>{
        (async()=>{
            try{
                let response = await axios.get('http://localhost:5000/all-sales')
                setResults(response.data.result)
            }catch(err){
                setError(err.response.data.message)
            }
        })()
    })


    return results.length === 0 ? <div>Loading....</div> : (
        <div style={{margin: 0}}>
            <br />
            {error !== '' && <p>{error}</p>}
            <br />
            {results.length > 0 &&
            <div>
                <CSVLink filename="All-Sales.csv" data={results}>Export</CSVLink><br/><br/><br/>
            <table border="1">
                <thead>
                    <tr>
                        <th>DD</th>
                        <th>MMM</th>
                        <th>YYYY</th>
                        <th>Type</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Market Place</th>
                        <th>Product Sales</th>
                        <th>Total</th>
                        <th>Currency</th>
                        <th>Rate(USD)</th>
                        <th>Product Sales(USD)</th>
                        <th>Total(USD)</th>
                    </tr>
                </thead>
                <tbody>  
                    {results.map((element,i) => {
                        return (
                            <tr key={i}>
                                <td>{element.dd}</td>
                                <td>{element.mmm}</td>
                                <td>{element.yyyy}</td>
                                <td>{element.type}</td>
                                <td>{element.sku}</td>
                                <td>{element.quantity}</td>
                                <td>{element.marketplace}</td>
                                <td>{element.product_sales}</td>
                                <td>{element.total}</td>
                                <td>{element.currency}</td>
                                <td>{element.rate_to_usd}</td>
                                <td>{element.product_sales_usd}</td>
                                <td>{element.total_usd}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>
            </div>
            }
            <Link to="/">Home</Link>
        </div>
    )
}

export default Sales
