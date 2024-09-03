import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [similarTracks, setSimilarTracks] = useState({});
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Fetch trending songs from backend
    axios.get('http://localhost:8001/populartracks')  // Update with your actual URL
      .then(response => {
        setTrendingSongs(response.data);
      })
      .catch(error => {
        console.error("Error fetching trending songs:", error);
      });
  }, []);

  const toggleDropdown = (index, trackId) => {
    if (visibleDropdown === index) {
      setVisibleDropdown(null); // Hide the dropdown if it's already visible
    } else {
      // Fetch similar tracks if not already fetched
      if (!similarTracks[trackId]) {
        axios.post(`http://localhost:8001/getsimilartrack/${trackId}`, { top_n: 2 })  // Update with your actual URL
          .then(response => {
            setSimilarTracks(prev => ({ ...prev, [trackId]: response.data.similar_tracks }));
          })
          .catch(error => {
            console.error("Error fetching similar tracks:", error);
          });
      }
      setVisibleDropdown(index); // Show the dropdown for the clicked item
    }
  };

  const handleSongClick = (trackId) => {
    const isLoggedIn = sessionStorage.getItem('userID'); // Check if the user is logged in
    if (isLoggedIn) {
      navigate(`/song/${trackId}`); // Redirect to the song page
    } else {
      navigate('/login'); // Redirect to the login page
    }
  };

  const handleRelatedSongClick = (trackId) => {
    const isLoggedIn = sessionStorage.getItem('userID'); // Check if the user is logged in
    if (isLoggedIn) {
      navigate(`/song/${trackId}`); // Redirect to the song detail page
    } else {
      navigate('/login'); // Redirect to the login page
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="trending-page flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Trending Songs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingSongs.map((song, index) => (
            <div key={index} className="trending-card p-6 bg-white rounded-lg shadow-lg relative">
              <h3 className="text-xl font-semibold mb-2">{song.track_name}</h3>
              <p className="text-gray-600 mb-4">{song.artist} - {song.genre}</p>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleSongClick(song.track_id)}
                >
                  Go to Song
                </button>
                <div className="relative">
                  <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                    onClick={() => toggleDropdown(index, song.track_id)}
                  >
                    Related Songs
                  </button>
                  {visibleDropdown === index && (
                    <div className="dropdown-content absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-10">
                      {similarTracks[song.track_id]?.slice(0, 2).map((relatedSong, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRelatedSongClick(relatedSong.track_id)}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        >
                          {relatedSong.track_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;

