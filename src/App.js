import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResetPassword from './pages/Reset-password/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import AddProduction from './pages/Add-production/AddProduction';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-production" element={<AddProduction />} />
        
      </Routes>
    </Router>
  );
}

export default App;
