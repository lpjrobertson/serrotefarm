import React, { useState } from 'react';
import { auth } from '../firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth'; 
import './reset-password.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault(); 
    setMessage(''); 

    // Send email to reset password
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Email sent! Please check your inbox.');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setMessage('Error sending email. Please check the address and try again.');
      });
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <div className="image-overlay">
          <h2>Reset Your Password</h2>
          <p>Keep track of everything, from produce to progress, all in one place.</p>
        </div>
      </div>
      <div className="login-form">
        <h1>Welcome to Our Farm</h1>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="forgot-password">
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
