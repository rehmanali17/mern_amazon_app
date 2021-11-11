import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router'
import { verify_token } from '../../utils/verify-token'
import { baseURL } from '../../utils/urls'

const AddCurrency = () => {
    const history = useHistory()
    let token = verify_token(history)
    const [formData, setFormData] = useState({
        currency: '',
        store: 'ukStore'
    })
    const [msgs,setMsgs] = useState([])
    const { store, currency } = formData

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setMsgs([{msg:'Loading'}])
        const config = { 
            headers: {
                'auth-token':token,
                'Content-Type': 'application/json'
            }
         }
        try{
            let response = await axios.post(`${baseURL}/currency/add-currency`,formData,config)
            setMsgs(response.data)
        }catch(err){
            if(err.response.status === 401){
                setMsgs([err.response.data])
            }else{
                setMsgs(err.response.data)
            }
            
        }
    }

    return (
        <div className="d-flex">
            <div>
                <form onSubmit={handleSubmit}>
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
                    <input type="text" placeholder="Currency" name="currency" onChange={handleChange} value={currency} /><br/><br/>
                    <input type="submit" value="Add" />
                </form>
                {msgs.length > 0 && 
                    <Fragment>
                        {msgs.map((msg,i) => {
                            return <p key={i}>{msg.msg}</p>
                        })}
                    </Fragment>
                }
                    <br/>
                    <br/>
                <Link to="/user">Home</Link>
            </div>
        </div>
    )
}

export default AddCurrency
