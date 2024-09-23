import React, { useState } from 'react';
import '../src/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username && password) {
            try {
                const response = await axios.post('http://localhost:3001/login', {
                    userName: username,
                    password: password
                });
                console.log(response.data);
                navigate('/');
            } catch (err) {
                console.error(err);
                setError('Login failed. Please try again.');
                alert('Please fill in all fields.'); 
            }
        } else {
            setError('Please fill in all fields.'); 
        }
    };
    const handleLoginRedirect = () => {
        navigate('/signup'); 
    };

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'
                            value={username}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            value={password}
                        />
                    </div>
                    {error && <p className='error-message'>{error}</p>}
                    <button onClick={handleSubmit} type='Login' className='login-btn'>Login</button>
                    <button type="submit" className='login-page-signup-btn' onClick={handleLoginRedirect} >Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
