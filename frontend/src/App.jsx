import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes ,useLocation,Navigate } from 'react-router-dom';

import Foryou from './components/foryou'
import Trending from './components/trending'
import Chatbot from './components/chatbot'
import Loginpage from './components/Loginpage'
import Sidebar from './components/Sidebar';
import SignupForm from './components/SignupForm';
import Topbar from './components/Topbar';
//import Trending2 from './components/Trending2';

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
              <Route path="/login" element={<Loginpage onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignupForm />} />

              {isLoggedIn ? (
                <>
                  <Route path="/foryou" element={<Foryou />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                </>
              ) : (
                <>
                  <Route path="/foryou" element={<Navigate to="/login" />} />
                  <Route path="/chatbot" element={<Navigate to="/login" />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    
                
              )}

export default App