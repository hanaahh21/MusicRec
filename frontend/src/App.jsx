import React from 'react'
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import Topbar from './components/Topbar'
import Foryou from './components/foryou'
import Trending from './components/trending'
import Chatbot from './components/chatbot'
import Loginpage from './components/Loginpage'
import Sidebar from './components/Sidebar';
import SignupForm from './components/SignupForm';

const App = () => {
  const location = useLocation();

  // Check if the current path is "/login"
  const isLoginPage = location.pathname == "/login";
  console.log(isLoginPage)
  return (
    <div>
      {!isLoginPage && (
        <>
          <Topbar />
          <div className="flex flex-1">
            <div className="w-1/3 p-4">
              <Sidebar/>
            </div>
            {/* For You Section */}
            <div className="w-1/3 p-4">
              <Foryou />
            </div>
            {/* Trending Section */}
            <div className="w-1/3 p-4 bg-gray-100">
              <Trending />
            </div>
            
          </div>
          <Chatbot />
          
        </>
      )}

      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/api/signup" element={<SignupForm />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}
  


export default App