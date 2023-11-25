import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Gun</a>
                <div className="d-flex">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/login'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to='/register'>Register</Link>
                        </li>
                    </ul>   
                </div>
            </div>
        </nav>
    )
}
