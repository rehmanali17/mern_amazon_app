import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { baseURL } from '../../utils/urls'
import { useHistory } from 'react-router'

const Login = () => {
    const history = useHistory()
    const [formData,setFormData] = useState({
        username: '',
        password: ''
    })
    const [msgs,setMsgs] = useState([])

    const { username, password } = formData

    const handleChange = event => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = async event =>{
        event.preventDefault()
        setMsgs([{msg:'Loading'}])
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        try {
            let response = await axios.post(`${baseURL}/auth/login`,formData,config)
            let [res] = response.data
            localStorage.setItem('auth-token',res.token)
            setMsgs(response.data)
            setTimeout(() => {
                history.push('/user')
            }, 1000);
        } catch (error) {
            setMsgs(error.response.data)
        }
    }
    return (
        <div className='d-flex'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' value={username} onChange={handleChange} placeholder='username' /><br/><br/>
                <input type='password' name='password' value={password} onChange={handleChange} placeholder='password' /><br/><br/>
                <input type='submit' value='Login' />
                {msgs.length > 0 && 
                    <Fragment>
                        {msgs.map((msg,i) => {
                            return <p key={i}>{msg.msg}</p>
                        })}
                    </Fragment>
                }
            </form>
        </div>
    )
}

export default Login
