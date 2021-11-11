import React, { useState } from 'react'
import axios from 'axios'
import { baseURL } from '../../utils/urls'
import { Fragment } from 'react/cjs/react.production.min'
import { useHistory } from 'react-router'
import { verify_token } from '../../utils/verify-token' 
import { Link } from 'react-router-dom'

const AddCustomer = () => {
    const history = useHistory()
    let token = verify_token(history)
    const [formData,setFormData] = useState({
        name:'',
        jurisdiction: '',
        url: ''
    })
    const [msgs,setMsgs] = useState([])

    const { name, jurisdiction, url } = formData

    const handleChange = event => {
        const { name, value } = event.target
        setFormData({
            ...formData,
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
            let response = await axios.post(`${baseURL}/customer/add-customer`,formData,config)
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
                <input type='text' name='name' value={name} onChange={handleChange} placeholder='name' /><br/><br/>
                <input type='text' name='jurisdiction' value={jurisdiction} onChange={handleChange} placeholder='jurisdiction' /><br/><br/>
                <input type='text' name='url' value={url} onChange={handleChange} placeholder='url' /><br/><br/>
                <input type='submit' value='Add' />
                {msgs.length > 0 && 
                    <Fragment>
                        {msgs.map((msg,i) => {
                            return <p key={i}>{msg.msg}</p>
                        })}
                    </Fragment>
                }
                <br /><br/>
                <Link to="/user">Home</Link>
            </form>
        </div>
    )
}

export default AddCustomer
