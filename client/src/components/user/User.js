import React from 'react'
import { Link } from 'react-router-dom'
import { verify_token } from '../../utils/verify-token'
import { useHistory } from 'react-router'

const User = () => {
    const history = useHistory()
    verify_token(history)

    return (
        <div className="d-flex">
            <div>
                <Link to="/user/currency/add-currency">Add Currency</Link><br/><br/>
                <Link to="/user/currency/view-currencies">View Currencies</Link><br/><br/>     
                <Link to="/user/customer/add-customer">Add Customer</Link><br/><br/>
                <Link to="/user/customer/view-customers">View Customers</Link>
            </div>
        </div>
    )
}

export default User