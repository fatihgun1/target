import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../redux/slice/loginSlice';

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector(state => state.user);

    const [user, setUser] = useState({
        email: null,
        password: null
    });

    const onFormChange = e => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const onSignIn = async e => {
        e.preventDefault();
        await dispatch(fetchLogin(user)).unwrap()
        .then((response)=> {
            if(response.token){
                window.location.replace('/profile')
            }
        }).catch((err)=>{
            console.log("Login failed");
        });

    }

    return (
        <form>
            <div className='mb-3'>
                <input className="form-control" name="email" placeholder="Email" type="email" onChange={onFormChange} />
            </div>
            <div className='mb-3'>
                <input className="form-control" name="password" placeholder="Password" type="password" onChange={onFormChange}/>
            </div>
            <button className='btn btn-primary' onClick={onSignIn}>
            {login.loading === true ?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    : <p>Login</p>}
            </button>
            <div className='row'>
                <div className="col">
                <span>Create a account? </span>
                <span><Link className='btn btn-primary' to='/register' > Register</Link></span>
                </div>
            </div>
            {login.error && <p>{login.error}</p>}
        </form>
    )
}
