import React from 'react'
import Topbar from './components/topbar'
import Foryou from './components/foryou'
import Trending from './components/trending'
import Chatbot from './components/chatbot'
import Bottombar from './components/Bottombar'

const App = () => {
  return (
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

      
      <Chatbot />
      <Bottombar />
    


    </div>
  )
}

export default App