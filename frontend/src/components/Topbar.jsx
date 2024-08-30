import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import LoginPage from './Loginpage';
import RegisterPage from './Registerpage';



const Topbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/register" );
  };
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo or Brand Name */}
      <div className="text-xl font-bold">MusicHub</div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 w-1/2">
        <input
          type="text"
          placeholder="Search for music..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Search
        </button>
      </div>

      {/* Authentication Buttons */}
      <div className="flex space-x-4">
        <button 
         className="bg-transparent hover:bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
         onClick={handleLoginClick} >
          Login
        </button>
        <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Topbar
