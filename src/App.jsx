import React from 'react'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import TestSpoonacularPage from './pages/TestSpoonacularPage'
import DashboardPage from './pages/DashboardPage'
import DietaryPrefPage from './pages/DietaryPrefPage'
import GualmartPage from './pages/GualmartPage' 
import RecipesPage from './pages/RecipesPage'
import DetailedViewPage from './pages/DetailedViewPage'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage'


function App(){
  return (
    // add future={{ v7_relativeSplatPath: true }} if routes start causing problems (react update)
    <Router > 
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />  
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/testSpoon" element={<TestSpoonacularPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dietpreferences" element={<DietaryPrefPage />} />
          <Route path="/gualmart" element={<GualmartPage />} />
          <Route path="/settings" element={<SettingsPage />} /> 
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/detailed" element={<DetailedViewPage />}/>
          {/* <Route path="/settings/account" element={<SettingsPage />} /> 
          <Route path="/settings/diet" element={<SettingsPage />} /> 
          <Route path="/settings/activity" element={<SettingsPage />} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;