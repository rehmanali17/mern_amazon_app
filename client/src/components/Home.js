import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <Link to="/view-currencies">View Currencies</Link><br/><br/>
            <Link to="/add-currency">Add Currency</Link><br/><br/>
            <Link to="/add-sales">Add Sales</Link><br/><br/>
            <Link to="/all-sales">View Sales</Link>
        </div>
    )
}

export default Home
