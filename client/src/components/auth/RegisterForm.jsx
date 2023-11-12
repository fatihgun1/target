import React, { useEffect, useState } from 'react'
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

    const onRegister = async e => {
        e.preventDefault();
        dispatch(fetchRegister(user)).then(()=>{
            if (register.success) {
                navigate('/login')
            }
        });
 

    }

    return (
        <form className='w-50'>
            <h2 className='text-center'>Register</h2>
            <div>
                <input id="fname" name="firstName" placeholder="First Name" type="text" onChange={onFormChange} />
            </div>
            <div>
                <input id="lname" name="lastName" placeholder="Last Name" type="text" onChange={onFormChange} />
            </div>
            <div>
                <input id="em" name="email" placeholder="Email" type="email" onChange={onFormChange} />
            </div>
            <div>
                <input id="password" name="password" placeholder="Password" type="password" onChange={onFormChange} />
            </div>
            <button className="btn btn-primary" onClick={onRegister} disabled={register.loading}>
                {register.loading === true ?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    : <p>Submit</p>}
            </button>
            <div className="">
                <p>Do you have account ?</p>
                <Link to='/login'>Login</Link>
            </div>
            {register.error && <p>{register.error}</p>}
        </form>
    )
}
