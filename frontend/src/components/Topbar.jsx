import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Topbar = ({ isLoggedIn, handleLogout }) => {
  const [searchType, setSearchType] = useState(''); // To store the selected search type
  const [query, setQuery] = useState(''); // To store the user input
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

  // Handle dropdown selection change
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setQuery(''); // Reset query when changing search type
  };

  // Handle search input change
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchTrackIdByName = async (trackName) => {
    try {
      const response = await axios.post(`http://localhost:8001/trackinfo_name/${trackName}`);
      const track = response.data.track_info[0]; // Assuming track_info contains an array with one track
      return track.track_id;
    } catch (error) {
      console.error("Error fetching track ID:", error);
      throw new Error("Track not found");
    }
  };
  

  const handleSearch = async () => {
    if (searchType && query) {
      if (searchType === 'song') {
        try {
          const trackId = await fetchTrackIdByName(query);
          navigate(`/song/${trackId}`); // Redirect to the song page by ID
        } catch (error) {
          // Handle error (e.g., display a message to the user)
          console.error("Error finding track ID:", error);
        }
      } else {
        navigate(`/recommendations?${searchType}=${query}`); // Redirect to recommendations page
      }
    }
  };
  

  return (
    <div className="topbar flex items-center justify-between p-4 bg-blue-600 text-white">
      <div className="text-xl font-bold">Music Hub</div>

      {/* Dropdown Search */}
      <div className="flex items-center space-x-2">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="p-2 rounded bg-white text-black"
        >
          <option value="" disabled>Select Category</option>
          <option value="song">Song Name</option>
          <option value="artist">Artist</option>
          <option value="genre">Genre</option>
          <option value="tag">Tag</option>
        </select>

        <input
          type="text"
          placeholder={`Search by ${searchType || '...'}`}
          value={query}
          onChange={handleQueryChange}
          className="p-2 rounded bg-white text-black"
          disabled={!searchType}
        />

        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          disabled={!query}
        >
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

export default Topbar;
