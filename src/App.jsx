import React from 'react'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignupPage'
import './App.css'
// import { Router } from 'express';
// import { Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />  
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;