import React from 'react';
import Recommended from './Recommended';
import Trending from './Trending';
import Chatbot from './Chatbot';
import backgroundImage from '../assets/background.jpg';

const Foryou = () => {

  
  return (
    <div 
    className="bgflex flex-col min-h-screen"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      {/* <Topbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> */}
      

      {/* Main Content */}
      <div className="flex flex-1 p-4">
        {/* Trending Songs Section */}
        <div className="w-1/2 p-4">
        {/*<h2 className="text-2xl font-bold mb-4">Trending Songs</h2> */}
          <Trending />
        </div>

        {/* For You Section */}
        <div className="w-1/2 p-4">  
          <Recommended />
        </div>
      </div>

      {/* Chatbot Section */}
      <Chatbot />
    </div>
  );
};

export default Foryou;
