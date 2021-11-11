import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { verify_token } from '../../utils/verify-token'
import { baseURL } from '../../utils/urls'

const ViewCurrencies = () => {
    const history = useHistory()
    let token = verify_token(history)
    const config = {
        headers:{
            'auth-token':token
        }
    }
    const [loading, setLoading] = useState(true)
    const [currency, setCurrency] = useState([])
    const [message, setMessage] = useState('')

    useEffect(()=>{
        (async()=>{
            try{
                let response = await axios.get(`${baseURL}/currency/get-currencies`,config)
                setCurrency(response.data.currencies)
                setLoading(false)
            }catch(err){
                setLoading(false)
                setMessage(err.response.data.msg)  
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const deleteSingleCurrency = async(url,id)=>{
        setMessage('Loading')
        try{
            let response = await axios.delete(url,config)
            setMessage(response.data.msg)
            setCurrency(currency.filter(curr => id !== curr._id))
        }catch(err){
            setMessage(err.response.data.msg)
        }
    }

    const deleteAllCurrency = async()=>{
        setMessage('Loading')
        try{
            let response = await axios.delete(`${baseURL}/currency/all-currency`,config)
            setMessage(response.data.msg)
            setCurrency([])
        }catch(err){
            setMessage(err.response.data.msg)
        }
    }

    return loading === true ? <div className="d-flex">Loading....</div> :  (
        <div className='d-flex'>
            { currency.length === 0  ? 
            <div>
                <p>No Currencies added</p><br/>
                <br/>
                <br/>
                <Link to="/user">Home</Link>
            </div> 
            : 
            <div>
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
                            <td><button onClick={()=> {deleteSingleCurrency(element.requests.DELETE,element._id)}}>Delete</button></td>
                            <td>{((element.store).replace('Store',"")).toUpperCase()}</td>
                            <td>{element.currency}</td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
                <br/>
                <br/>
                {message !== '' && <p>{message}</p>}
                <br/>
                <br/>
                <Link to="/user">Home</Link>
            </div> 
        }
    </div>
        
    )
}

export default ViewCurrencies
