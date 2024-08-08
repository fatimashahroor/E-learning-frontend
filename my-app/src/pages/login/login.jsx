import React, { useState } from 'react';
import axios from 'axios';
import "./login.css";
import {useNavigate} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      const token= sessionStorage.setItem('token', response.data.token);
      navigate ("/home");
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed');
    }
  };

  return (
    <div className="container">
    <form onSubmit={handleLogin} className="form">
    <h2>Login</h2>
        <div className='input-label'>
        <label className="label">
            Email:
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="input" />
        </label>
        <label className="label">
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
        </label>
        <p>Don't have an account? Register <a href="/register">here</a></p>
        </div>
        <button type="submit" className="button">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
