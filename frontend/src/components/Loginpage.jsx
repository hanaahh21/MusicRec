import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useAuth } from '../context/AuthProvider'; // Adjust the import path


const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const registered = sessionStorage.getItem('isRegistered');

  const navigate = useNavigate();
  // const { setUser } = useAuth(); // Use context to set user

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });
      console.log('User logged in:', response.data);
      setSuccess('Login successful!');
      sessionStorage.setItem('userID', response.data.id); // Store username
      sessionStorage.setItem('isNewUser', 'false'); // Store token in session storage
      onLogin(); // Call the function passed as a prop to set the login state in the App component
      if (registered === 'true') {
        navigate('/preferences');
      }
      else{
      navigate('/foryou'); // Redirect to the "For You" page
    }
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      setError(error.response.data.detail);
    }
  };

  const goToSignUp = () => {
    navigate('/register'); // Navigate to SignUpPage
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {success && (
          <p className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-center">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button onClick={goToSignUp} className="text-blue-500 hover:text-blue-600 font-semibold">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
