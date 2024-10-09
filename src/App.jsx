import React from 'react'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignupPage'
import TestSpoonacularPage from './pages/TestSpoonacularPage'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />  
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/testSpoon" element={<TestSpoonacularPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;