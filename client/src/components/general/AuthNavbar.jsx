import React from 'react'
import { useDispatch,  } from 'react-redux'
import { Link  } from 'react-router-dom'
import { logout } from '../../redux/slice/userSlice';
export default function AuthNavbar() {
    const dispatch = useDispatch();

    const logouth = async () => {
        dispatch(logout())
        if(localStorage.getItem("token")===null){
            window.location.replace('/')
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/profile">Gun</Link>
                <div className="d-flex">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link active" onClick={logouth}>Logout</button>
                        </li>
                    </ul>   
                </div>
            </div>
        </nav>
    )
}
