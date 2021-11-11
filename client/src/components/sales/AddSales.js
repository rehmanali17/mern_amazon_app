import axios from 'axios'
import React, { Fragment, useState  } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { verify_token } from '../../utils/verify-token'
import { baseURL } from '../../utils/urls'

const AddSales = ({location}) => {
    const history = useHistory()
    let token = verify_token(history)
    const [file, setFile] = useState(null)
    const [store,setStore] = useState('ukStore')
    const [results,setResults] = useState([])
    const [status,setStatus] = useState('')

    const handleFileChange = (e)=>{
        setFile(e.target.files[0])
    }

    const handleChange = (e)=>{
        setStore(e.target.value)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        const fd = new FormData()
        fd.append('store-file',file)
        fd.append('store',store)
        setStatus('Loading')
        try{
            const config = {
                headers: {
                    'auth-token':token,
                    'Content-Type': 'multipart/form-data'
                }
            }
            let response = await axios.post(location.state.request_url,fd,config)
            setResults(response.data.result)
            setStatus('')
        }catch(err){
            setStatus(err.response.data.message)
        }
    }

    const handleSave = async ()=>{
        if(results.length > 0){
            setStatus('Loading')
            try{
                const config = {
                    headers: {
                        'auth-token':token,
                        'Content-Type': 'application/json'
                    }
                }
                let data = {
                    records: results
                }
                let response = await axios.post(`${baseURL}/sales/add-sales`,data,config)
                setStatus(response.data.message)
                setResults([])
            }catch(err){
                setStatus(err.response.data.message)
            }
        }
    }

    return (
        <div style={{margin:0}}>
            <div>
                { results.length <= 0 && 
                    <Fragment>
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
                    </Fragment>
                }
                <br />
                {status !== '' && <p>{status}</p>}
                <br />
                {results.length > 0 &&
                <div>
                    <button onClick={handleSave} >Save</button><br/><br/>
                    <Link to="/user/customer/view-customers">Cancel</Link><br/><br/>
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
                <br />
                <br />
                <Link to="/user/customer/view-customers">Home</Link>
                <br />
                <br />
            </div>
        </div>
    )
}

export default AddSales
