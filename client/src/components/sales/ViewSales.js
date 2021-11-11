import axios from 'axios'
import React, { useState, useEffect, Fragment  } from 'react'
import { Link } from 'react-router-dom'
import { CSVLink } from "react-csv";
import { useHistory } from 'react-router';
import { verify_token } from '../../utils/verify-token';
import { baseURL } from '../../utils/urls';

const ViewSales = ({location}) => {
    const history = useHistory()
    let token = verify_token(history)
    const [loading, setLoading] = useState(true)
    const [results,setResults] = useState([])
    const [message,setMessage] = useState('')
    const config = {
        headers: {
            'auth-token':token
        }
    }
    useEffect(()=>{
        (async()=>{
            try{
                let response = await axios.get(location.state.request_url,config)
                setResults(response.data.sales)
                setLoading(false)
            }catch(err){
                setLoading(false)
                setMessage(err.response.data.message)
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const deleteSingleSale = async(url,id)=>{
        setMessage('Loading')
        try{
            let response = await axios.delete(url,config)
            setResults(results.filter( result => result.id !== id ))
            setMessage(response.data.message)
        }catch(err){
            setMessage(err.response.data.message)
        }
    }

    const deleteAllSales = async(id)=>{
        try{
            setMessage('Loading')
            let response = await axios.delete(`${baseURL}/sales/delete-all-sales`)
            setMessage(response.data.message)
            setResults([])
        }catch(err){
            setMessage(err.response.data.message)
        }
    }


    return loading === true ? <div className="d-flex">Loading....</div> : (
        <Fragment>
            {results.length === 0 ? 
                <div className="d-flex">
                    <div>
                        <p>{message}</p>
                        <Link to="/user/customer/view-customers">Home</Link>
                    </div>
                </div> 
                : 
                <div style={{margin: 0}}>
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
                                            <td><button onClick={()=> {deleteSingleSale(element.requests.DELETE,element.id)}}>Delete</button></td>
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
        <br />
        <Link to="/user/customer/view-customers">Home</Link>
        <br />
        <br />
    </Fragment>
    )
}

export default ViewSales
