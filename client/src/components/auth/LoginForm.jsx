import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLogin } from '../../redux/slice/loginSlice';
import { decodeToken } from 'react-jwt';

export default function LoginForm() {
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

    const onSignIn =  () => {
        dispatch(fetchLogin(user)).unwrap()
        .then((response)=> {
            console.log("sii");
            if(response.token){
                const user = decodeToken(response.token);
                localStorage.setItem('user',JSON.stringify({user:user.sub,token:response.token}));
                window.location.replace('/profile')
            }
        })
    }

    return (
        <div className='container'>
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
        </div>
    )
}
