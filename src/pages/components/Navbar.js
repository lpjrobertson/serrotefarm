import React from 'react';
import './navbar.css'; 
import im6 from '../../assets/Logo2.png';

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <a href="/"><img className='logo1' src={im6} alt="Logo" /></a>
      </div>
      <nav>
        <a href="/#about">About Us</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
}

export default Navbar;
