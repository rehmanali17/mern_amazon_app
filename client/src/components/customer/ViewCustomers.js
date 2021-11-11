import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { verify_token } from '../../utils/verify-token'
import { baseURL } from '../../utils/urls'

const ViewCustomers = () => {
    const history = useHistory()
    let token = verify_token(history)
    const config = {
        headers:{
            'auth-token':token
        }
    }
    const [loading, setLoading] = useState(true)
    const [customers, setCustomers ] = useState([])
    const [message, setMessage] = useState('')

    useEffect(()=>{
        (async()=>{
            try{
                let response = await axios.get(`${baseURL}/customer/get-customers`,config)
                setCustomers(response.data.customers)
                setLoading(false)
            }catch(err){
                setLoading(false)
                setMessage(err.response.data.msg)  
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const redirect = (redirect_url,request_url) =>{
        history.push(redirect_url,{
            request_url
        })
    }

    // const deleteSingleCurrency = async(url,id)=>{
    //     setMessage('Loading')
    //     try{
    //         let response = await axios.delete(url,config)
    //         setMessage(response.data.msg)
    //         setCurrency(currency.filter(curr => id !== curr._id))
    //     }catch(err){
    //         setMessage(err.response.data.msg)
    //     }
    // }

    // const deleteAllCurrency = async()=>{
    //     setMessage('Loading')
    //     try{
    //         let response = await axios.delete(`${baseURL}/currency/all-currency`,config)
    //         setMessage(response.data.msg)
    //         setCurrency([])
    //     }catch(err){
    //         setMessage(err.response.data.msg)
    //     }
    // }

    return loading === true ? <div className="d-flex">Loading....</div> :  (
        <div className='d-flex'>
            { customers.length === 0  ? 
            <div>
                <p>No Customers have been added</p><br/>
                <br/>
                <br/>
                <Link to="/user">Home</Link>
            </div> 
            : 
            <div>
                {/* <button onClick={deleteAllCurrency}>Delete All Currencies</button> */}
                {/* <br /><br /> */}
                <table border="1">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Name</th>
                            <th>Jurisdiction</th>
                            <th>URL</th>
                            <th>View Seller Accounts</th>
                            <th>Add Seller Account</th>
                        </tr>
                    </thead>
                    <tbody>  
                {customers.map((element,i) => {
                    return (
                        <tr key={element._id}>
                            <td>{i+1}</td>
                            <td>{element.name}</td>
                            <td>{element.jurisdiction}</td>
                            <td>{element.url}</td>
                            <td><button onClick={() => { redirect('/user/seller-account/view',element.requests.GET) }} >View</button></td>
                            <td><button onClick={() => { redirect('/user/seller-account/add',element.requests.ADD) }} >Add</button></td>
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

export default ViewCustomers
