import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Recommended = () => {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [similarTracks, setSimilarTracks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user_name = sessionStorage.getItem('user_name');
  
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const searchType = searchParams.keys().next().value; // Get the search type (song, artist, etc.)
  // const query = searchParams.get(searchType); // Get the user query
  const userId = sessionStorage.getItem('userID'); // Retrieve user ID from session storage

  useEffect(() => {
    if (userId) {
      // Fetch recommended songs based on user ID
      axios.post(`http://sessionhost:8001/recommend/b80344d063b5ccb3212f76538f3d9e43d87dca9e`, { top_n: 10 }) // Update with your actual URL
        .then(response => {
          setRecommendedSongs(response.data.recommended_tracks);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching recommended tracks:', error);
          setError('Failed to fetch recommended tracks.');
          setLoading(false);
        });
    } else {
      setError('User ID not found in session storage.');
      setLoading(false);
    }
  }, [userId]);

  const toggleDropdown = (index, trackId) => {
    if (visibleDropdown === index) {
      setVisibleDropdown(null); // Hide the dropdown if it's already visible
    } else {
      // Fetch similar tracks if not already fetched
      if (!similarTracks[trackId]) {
        axios.post(`http://sessionhost:8001/getsimilartrack/${trackId}`, { top_n: 2 })  // Update with your actual URL
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Made for {user_name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedSongs.map((song, index) => (
            <div key={song.track_id} className="trending-card p-6 bg-white rounded-lg shadow-lg relative">
              <h3 className="text-xl font-semibold mb-2">{song.track_name}</h3>
              <p className="text-gray-600 mb-4">{song.artist} - {song.genre}</p>
              <div className="flex space-x-4">
                <a href={`/song/${song.track_id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Go to Song</a>
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
                        <a href={`/song/${relatedSong.track_id}`} key={idx} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          {relatedSong.track_name}
                        </a>
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

export default Recommended;
