import axios from 'axios'
import React, { useState, useEffect, Fragment  } from 'react'
import { Link } from 'react-router-dom'
import { CSVLink } from "react-csv";
 


const Sales = () => {
    const [loading, setLoading] = useState(true)
    const [results,setResults] = useState([])
    const [message,setMessage] = useState('')

    useEffect(()=>{
        (async()=>{
            try{
                let response = await axios.get('https://amazon-sellers-app.herokuapp.com/sales/all-sales')
                // let response = await axios.get('http://localhost:5000/sales/all-sales')
                setResults(response.data.sales)
                setLoading(false)
            }catch(err){
                setMessage(err.response.data.message)
            }
        })()
    },[])

    const deleteSingleSale = async(id)=>{
        try{
            let response = await axios.delete(`https://amazon-sellers-app.herokuapp.com/sales/single-sale/${id}`)
            // let response = await axios.delete(`http://localhost:5000/sales/single-sale/${id}`)
            setMessage(response.data.message)
            setResults(results.filter(result => id !== result._id))
        }catch(err){
            setMessage(err.response.data.message)
        }
    }

    const deleteAllSales = async(id)=>{
        try{
            let response = await axios.delete('https://amazon-sellers-app.herokuapp.com/sales/all-sales')
            // let response = await axios.delete('http://localhost:5000/sales/all-sales')
            setMessage(response.data.message)
            setResults([])
        }catch(err){
            setMessage(err.response.data.message)
        }
    }


    return loading === true ? <div className="App">Loading....</div> : (
        <Fragment>
            {results.length === 0 ? <div className="App">No Sales</div> : <div style={{margin: 0}}>
            <br />
            {message !== '' && <p>{message}</p>}
            <br />
            <button onClick={deleteAllSales}>Delete All Sales</button>
            <br /><br />
            {results.length > 0 &&
            <div>
                <CSVLink filename="All-Sales.csv" data={results}>Export</CSVLink><br/><br/><br/>
            <table border="1">
                <thead>
                    <tr>
                        <th>Delete</th>
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
                                <td><button onClick={()=> {deleteSingleSale(element.id)}}>Delete</button></td>
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
            
        </div> }
        <Link to="/">Home</Link>
    </Fragment>
    )
}

export default Sales
