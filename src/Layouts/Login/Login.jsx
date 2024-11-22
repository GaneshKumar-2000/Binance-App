import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authStore/authStore';

const Login = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: "", password: "" }); //State used to store the user credentials
    const token = "u4b5i5b3l6bljk45b6jkh45vj6h4v5jk6hv45jhl6vb245hjl"; //Randomly typed token

    const LoginUser = (e) => {
        e.preventDefault();

        if (credentials.email === "user@gmail.com" && credentials.password === "password") {
            dispatch(login({ email: credentials.email, token: token }))
        } else {
            alert("Invalid email or password")
        }
    }

    return (
        <div className='login'>
            <div className='login-main'>
                <form onSubmit={LoginUser}>
                    <div className='user-details row'>
                        <input type='email' required placeholder='Enter your email' onChange={(e) => setCredentials((d) => ({ ...d, email: e.target.value }))} />
                        <input type='password' required placeholder='Enter your password' onChange={(e) => setCredentials((d) => ({ ...d, password: e.target.value }))} />
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login