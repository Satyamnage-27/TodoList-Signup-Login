import React, { useState } from 'react';
import '../src/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username && password) {
            try {
                const response = await axios.post('http://localhost:3001/signup', {
                    userName: username,
                    password: password
                });
                console.log(response);
                // navigate('/');
            } catch (err) {
                console.log(err.response);

                console.error(err);
                setError(err.response.data.message);
                setError('User already exits');
            }
        } else {
            setError('Please fill in all fields.');
        }
    };
    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <h2>Sign Up</h2>
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
                    <button type="submit" >Sign Up</button>
                    <button onClick={handleLoginRedirect} type='button' id='login-button'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
