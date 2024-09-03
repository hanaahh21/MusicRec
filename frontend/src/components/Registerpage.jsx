import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios


const RegisterPage = () => {
  const [userid, setUserid] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success messages
  const [inputErrors, setInputErrors] = useState({}); // New state for input errors

  const navigate = useNavigate(); // Hook to programmatically navigate



  // Helper function to check for input errors
  const getInputClass = (field) => {
    return inputErrors[field] ? 'border-red-500' : 'border-gray-300';
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    // Clear previous messages
    setError('');
    setSuccess('');
    setInputErrors({});

    // Example validation
    let errors = {};
    if (!firstname) errors.firstname = 'First name is required';
    if (!lastname) errors.lastname = 'Last name is required';
    if (!gender) errors.gender = 'Gender is required';
    if (!email) errors.email = 'Email is required';
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    if (Object.keys(errors).length > 0) {
        setInputErrors(errors);
        return;
    }
    
    try {
      const response = await axios.post('http://localhost:8000/register', {
        firstname : firstname,
        lastname : lastname,
        gender : gender,
        email : email,
        username : username,
        password : password,
      });
      console.log('User registered:', response.data);
      setSuccess('Registration successful! Login to Enjoy'); // Set success message
      // sessionStorage.setItem('user_name', response.data.username); // Store username in session storage
      // sessionStorage.setItem('userID', response.data.id); // Store user ID in session storage
      sessionStorage.setItem('isNewUser', 'true'); // Store token in session storage
      sessionStorage.setItem('isRegistered','true'); // Store token in session storage
      // navigate('/preferences'); // Redirect to the preferences page
    } catch (error) {
      console.error('Error registering:', error.response.data);
      setError(error.response.data.detail);
      
    }
  };

  const goToLogin = () => {
    navigate('/login'); // Redirect to LoginPage
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {success && (
          <p className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-center">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass('firstname')}`}
                />
                {inputErrors.firstname && <p className="text-red-500 text-sm">{inputErrors.firstname}</p>}
             </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass('lastname')}`}
              />
              {inputErrors.lastname && <p className="text-red-500 text-sm">{inputErrors.lastname}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                Gender
              </label>
              <input
                type="text"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass('gender')}`}
              />
              {inputErrors.gender && <p className="text-red-500 text-sm">{inputErrors.gender}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass('email')}`}
              />
              {inputErrors.email && <p className="text-red-500 text-sm">{inputErrors.email}</p>}
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass('username')}`}
            />
            {inputErrors.username && <p className="text-red-500 text-sm">{inputErrors.username}</p>}
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass('password')}`}
            />
            {inputErrors.password && <p className="text-red-500 text-sm">{inputErrors.password}</p>}
          </div>

          <button 
          type = "submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <button onClick={goToLogin} className="text-blue-500 hover:text-blue-600 font-semibold">
            Login
          </button>
        </p>
      
        </div>
      </div>
   
  );
};

export default RegisterPage;