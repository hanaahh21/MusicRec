import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import LoginPage from './Loginpage';
import RegisterPage from './Registerpage';



const Topbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile'); // Navigate to Profile page
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to Login page
  };

  const handleSignup = () => {
    navigate('/register'); // Navigate to Signup page
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
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <button
              className="mx-2 p-2 bg-red-500 hover:bg-red-600 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="mx-2 p-2 bg-green-500 hover:bg-green-600 rounded"
              onClick={handleProfile}
            >
              Profile
            </button>
          </>
        ) : (
          <>
            <button
              className="mx-2 p-2 bg-blue-700 hover:bg-blue-800 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="mx-2 p-2 bg-green-500 hover:bg-green-600 rounded"
              onClick={handleSignup}
            >
              Signup
            </button>
          </>
        )}
        </div>
    </div>
  );
};

export default Topbar
