import React from 'react'
import { Link } from 'react-router-dom'

export default function Navlinks() {
    return (
        <div className=''>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/todos" className="nav-link">Todos</Link>
                </li>
            </ul>
        </div>
    )
}
