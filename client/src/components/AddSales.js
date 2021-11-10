import axios from 'axios'
import React, { useState  } from 'react'
import { Link } from 'react-router-dom'

const AddSales = () => {
    const [file, setFile] = useState(null)
    const [store,setStore] = useState('ukStore')
    const [results,setResults] = useState([])
    const [error,setError] = useState('')

    const handleFileChange = (e)=>{
        setFile(e.target.files[0])
    }

    const handleChange = (e)=>{
        setStore(e.target.value)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        const fd = new FormData()
        fd.append('storeFile',file)
        fd.append('store',store)
        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let response = await axios.post('https://amazon-sellers-app.herokuapp.com/sales/add-sales',fd,config)
            // let response = await axios.post('http://localhost:5000/sales/add-sales',fd,config)
            setResults(response.data.result)
        }catch(err){
            setError(err.response.data.message)
        }
    }

    const handleSave = async ()=>{
        if(results.length > 0){
            try{
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let data = {
                    records: results
                }
                let response = await axios.post('https://amazon-sellers-app.herokuapp.com/sales/add-sales-db',data,config)
                // let response = await axios.post('http://localhost:5000/sales/add-sales-db',data,config)
                setError(response.data.message)
                setResults([])
            }catch(err){
                setError(err.response.data.message)
            }
        }
    }

    return (
        <div style={{margin: 0}}>
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <input type="file" onChange={handleFileChange} /><br /><br />
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
                <input type="submit" value="Add File" />
            </form>
            <br />
            {error !== '' && <p>{error}</p>}
            <br />
            {results.length > 0 &&
            <div>
              <button onClick={handleSave} >Save</button><br/><br/>
              <Link to="/">Cancel</Link><br/><br/>
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

export default AddSales
