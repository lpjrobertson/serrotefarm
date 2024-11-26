import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import Navbar from '../components/Navbar';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setError('Error logging in. Please check your email and password.');
      });
  };

  return (
    <div>
    
    <div className="login-container">
       
      
      <div className="login-image">
        <div className="image-overlay">
          <h2>Welcome to Our Farm</h2>
          <p>Keep track of everything, from produce to progress, all in one place.</p>
        </div>
      </div>
      <div className="login-form">
        <h1>Login</h1>
        <p className="signup-link">
          Don’t have an account? <a href="/register">Sign up now</a>
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <button type="submit">Log In</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="forgot-password">
          <a href="/reset-password">Forgot Your Password?</a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;