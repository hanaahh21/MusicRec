import  { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCog, FaMoon, FaSun, FaSignOutAlt, FaHome } from 'react-icons/fa';
import axios from 'axios';

const Sidebar = () => {
  const user_id = sessionStorage.getItem('userID'); // Retrieve username
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  useEffect(() => {
    if (user_id) {
      // Fetch user details from the backend
      axios.get(`http://sessionhost:8000/user/${user_id}`)
        .then(response => {
          const data = response.data;
          sessionStorage.setItem('user_name', data.username)
          setUserData({
            username: data.username,
            email: data.email,
          });
        }
)
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }

  }, [user_id]);


  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  // Handle logout (example function, implement actual logout logic as needed)
  const handleLogout = () => {
    // Clear user session or perform logout actions
    alert('Logged out');
  };

  return (
    // check full screen
    <div className={`flex flex-col w-64 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-500 text-white'}`}>  
      <div className="p-4">
        {/* User Profile Section */}
        <div className="flex items-center mb-6">
          <FaUserCircle size={50} className="mr-3" />
          <div>
            <p className="text-lg font-bold">{userData.username}</p>
            <p className="text-sm text-gray-400">{userData.email}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul>
          <li>
              <Link to="/foryou" className="flex items-center p-3 hover:bg-gray-700">
                <FaHome size={20} className="mr-3" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center p-3 hover:bg-gray-700">
                <FaUserCircle size={20} className="mr-3" />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center p-3 hover:bg-gray-700">
                <FaCog size={20} className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Dark Mode Toggle and Logout */}
        <div className="mt-6">
          <button onClick={handleDarkModeToggle} className="flex items-center p-3 hover:bg-gray-700 w-full text-left">
            {isDarkMode ? (
              <FaSun size={20} className="mr-3" />
            ) : (
              <FaMoon size={20} className="mr-3" />
            )}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={handleLogout} className="flex items-center p-3 hover:bg-gray-700 w-full text-left mt-2">
            <FaSignOutAlt size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;