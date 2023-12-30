import React from 'react'
import { Link } from 'react-router-dom'

export default function Navlinks() {
    return (
        <div className=''>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/market" className="nav-link">Market place</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/project" className="nav-link">Project</Link>
                </li>
                <li className="nav-item">
                    <Link to="/learning" className="nav-link">Learnings</Link>
                </li>
                <li className="nav-item">
                    <Link to="#" className="nav-link">Notes</Link>
                </li>
            </ul>
        </div>
    )
}
