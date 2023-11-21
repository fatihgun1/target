import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileNavbar() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Jack Daniel</span>
                <form className="d-flex">
                    <Link className="btn btn-outline-success" to='/profile/settings'>Settings</Link>
                </form>
            </div>
        </nav>
    )
}
