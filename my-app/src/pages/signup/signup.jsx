import React, { useState } from 'react';
import axios from 'axios';
import "./signup.css";

function Register() {
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', userData);
            sessionStorage.setItem('token', response.data.token); 
            console.log(response.data);
            setSuccess('Registration successful!');
            setError('');
        } catch (error) {
            setError(error.response.data.message);
            setSuccess('');
        }
    };

    return (
        <div className="register-container">
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit} className="register-form">
            <h2>Register</h2>
                <label>
                    Fullname:
                    <input type="text" name="fullname" value={userData.fullname} onChange={handleChange} className="input-field" />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleChange} className="input-field" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={userData.password} onChange={handleChange} className="input-field" />
                </label>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
}

export default Register;
