import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../redux/slice/loginSlice';

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector(state => state.login);

    const [user, setUser] = useState({
        email: null,
        password: null
    });

    const onFormChange = e => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const onSignIn =  e => {
        e.preventDefault();
        dispatch(fetchLogin(user));
    }

    useEffect(()=>{
        console.log(login.success);
    },[login]);

    return (
        <form>
            <h2 className=''>Login</h2>
            <div>
                <input id="email" name="email" placeholder="Email" type="email" onChange={onFormChange} />
            </div>
            <div >
                <input id="password" name="password" placeholder="Password" type="password" onChange={onFormChange}/>
            </div>
            <button className='btn btn-primary' onClick={onSignIn}>
            {login.loading === true ?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    : <p>Login</p>}
            </button>
            <div>
                <p>Create a account? </p>
                <Link to='/register'> Register</Link>
           
            </div>
            {login.error && <p>{login.error}</p>}
        </form>
    )
}
