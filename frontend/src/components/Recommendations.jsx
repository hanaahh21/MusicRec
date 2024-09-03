import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';


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

  return (
    <div className="recommendations-page p-4">
      {error && <div className="text-red-500">{error}</div>}
      {!error && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Recommendations for {searchQuery}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => (
              <div key={track.track_id} className="track bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{track.track_name}</h3>
                <p className="text-gray-600">{track.artist}</p>
                <p className="text-gray-500">{track.genre}</p>
                <Link
                  to={`/song/${track.track_id}`}
                  className="text-blue-500 hover:underline"
                >
                  Go to Song
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
