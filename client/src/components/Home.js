import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="d-flex">
            <div>
                <Link to="/login">Login</Link> <br/><br/>
                <Link to="/signup">Sign Up</Link> <br/><br/>
            </div>
        </div>
    )
}

export default Home
