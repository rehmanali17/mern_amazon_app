import React, { useState } from 'react'
import axios from 'axios'
import { Fragment } from 'react/cjs/react.production.min'
import { useHistory } from 'react-router'
import { verify_token } from '../../utils/verify-token' 
import { Link } from 'react-router-dom'

const AddSellerAccount = ({location}) => {
    const history = useHistory()
    let token = verify_token(history)
    const [formData,setFormData] = useState({
        seller_account:''
    })
    const [msgs,setMsgs] = useState([])

    const { seller_account } = formData

    const handleChange = event => {
        const { name, value } = event.target
        setFormData({
            [name]:value
        })
    }

    const handleSubmit = async event=>{
        event.preventDefault()
        setMsgs([{msg:'Loading'}])
        const config = {
            headers: {
                'auth-token':token,
                'Content-Type':'application/json'
            }
        }
        try {
            let response = await axios.post(location.state.request_url,formData,config)
            setMsgs(response.data)
        } catch (error) {
            if(error.response.status === 401){
                setMsgs([error.response.data])
            }else{
                setMsgs(error.response.data)
            }
            
        }
    }
    return (
        <div className='d-flex'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='seller_account' value={seller_account} onChange={handleChange} placeholder='Seller Account' /><br/><br/>
                <input type='submit' value='Add' />
                {msgs.length > 0 && 
                    <Fragment>
                        {msgs.map((msg,i) => {
                            return <p key={i}>{msg.msg}</p>
                        })}
                    </Fragment>
                }
                <br /><br/>
                <Link to="/user/customer/view-customers">Home</Link>
            </form>
        </div>
    )
}

export default AddSellerAccount
