import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';  
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;  

     
      const userDocRef = doc(db, 'users', user.uid);  

      
      await setDoc(userDocRef, {
        name: name,  
        email: email, 
      });

      console.log('User registered:', user);
      alert('User registered successfully!');
      navigate('/login');  
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try another.');
      } else {
        console.error('Error registering user:', error);
        setError('Error registering. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <div className="image-overlay">
          <h2>Serrote Farm</h2>
          <p>"This is where dreams begin to bloom and grow stronger each new day."</p>
        </div>
      </div>
      <div className="register-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Register;