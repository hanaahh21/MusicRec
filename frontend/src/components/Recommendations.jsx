import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

const Recommendations = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchType = query.keys().next().value; // 'artist', 'genre', or 'tag'
  const searchQuery = query.get(searchType);

  useEffect(() => {
    if (searchType && searchQuery) {
      axios.post(`http://localhost:8001/trackinfo_${searchType}/${searchQuery}`)
        .then(response => {
          setTracks(response.data.track_info);
        })
        .catch(error => {
          setError("No tracks found for this query");
        });
    }
  }, [searchType, searchQuery]);

  // Define multiple gradient options
  const gradients = [
    "bg-gradient-to-r from-purple-100 via-pink-200 to-red-200",
    "bg-gradient-to-r from-blue-100 via-blue-200 to-purple-200",
    "bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-200",
    "bg-gradient-to-r from-indigo-100 via-teal-200 to-purple-200",
  ];

  return (
    <div className="recommendations-page p-4 flex flex-col h-screen w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {error && <div className="text-red-500">{error}</div>}
      {!error && (
        <div>
          <h1 className="text-xl text-white font-bold mb-4">Recommendations for {searchQuery}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => {
              // Randomly select a gradient for each song card
              const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

              return (
                <div key={track.track_id} className={`track ${randomGradient} p-4 rounded-lg shadow`} 
                style={{ height: 'auto' }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 overflow-hidden">{track.track_name}</h3>
                  <p className="text-gray-600 mb-4 overflow-hidden" >{track.artist}</p>
                  <p className="text-gray-500 mb-4 overflow-hidden">{track.genre}</p>
                  <Link
                    to={`/song/${track.track_id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Go to Song
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
