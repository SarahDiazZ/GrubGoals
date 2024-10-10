import React from 'react'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import TestSpoonacularPage from './pages/TestSpoonacularPage'
import DashboardPage from './pages/DashboardPage'
import DietaryPrefPage from './pages/DietaryPrefPage'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage'


function App(){
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />  
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/testSpoon" element={<TestSpoonacularPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dietpreferences" element={<DietaryPrefPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;