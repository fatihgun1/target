import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRegister } from '../../redux/slice/registerSlice';

export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const register = useSelector(state => state.register)

    const [user, setUser] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
    });

    const onFormChange = e => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const onRegister = () => {
        dispatch(fetchRegister(user)).then((response) => {
            console.log(response);
            if (response.payload) {
                navigate('/login')
            }
        });
    }

    return (
        <div className='container'>
            <div className='mb-3'>
                <input className="form-control" name="firstName" placeholder="First Name" type="text" onChange={onFormChange} />
            </div>
            <div className='mb-3'>
                <input className="form-control" name="lastName" placeholder="Last Name" type="text" onChange={onFormChange} />
            </div>
            <div className='mb-3'>
                <input className="form-control" name="email" placeholder="Email" type="email" onChange={onFormChange} />
            </div>
            <div className='mb-3'>
                <input className="form-control" name="password" placeholder="Password" type="password" onChange={onFormChange} />
            </div>
            <button className="btn btn-primary" onClick={onRegister} disabled={register.loading}>
                {register.loading === true ?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    : <p>Submit</p>}
            </button>
            <div className="row">
                <div className="col">
                    <span>Do you have account ?</span>
                    <span><Link className='btn btn-primary' to='/login'>Login</Link></span>
                </div>
            </div>
            {register.error && <p>{register.error}</p>}
        </div>
    )
}
