import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Foryou from './components/foryou';
import Trending from './components/Trending';
import Chatbot from './components/Chatbot';
import LoginPage from './components/Loginpage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import RegisterPage from './components/Registerpage';
import Profile from './components/Profile';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    
      <div>
        <Topbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="main-content flex">
          {isLoggedIn && <Sidebar />}
          <div className="content-area flex-1">
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterPage />} />
              {isLoggedIn ? (
                <>
                  <Route path="/foryou" element={<Foryou />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              ) : (
                <>
                  <Route path="/foryou" element={<Navigate to="/login" />} />
                  <Route path="/chatbot" element={<Navigate to="/login" />} />
                  <Route path="/profile" element={<Navigate to="/login" />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    
  );
};

export default App;
