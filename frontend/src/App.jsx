import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Topbar from './components/Topbar'
import Foryou from './components/foryou'
import Trending from './components/trending'
import Chatbot from './components/chatbot'
import Bottombar from './components/Bottombar'
import Loginpage from './components/Loginpage'

const App = () => {
  return (
  
<Router>
      <div>
        <Topbar />
        <div className="flex flex-1">
          {/* For You Section */}
          <div className="w-2/3 p-4">
            <Foryou />
          </div>
          {/* Trending Section */}
          <div className="w-1/3 p-4 bg-gray-100">
            <Trending />
          </div>
        </div>
        <Bottombar />
        <Chatbot />

        <Routes>
          <Route path="/login" element={<Loginpage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App