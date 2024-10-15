import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Song = () => {
  const { trackId } = useParams(); // Capture the trackId from the URL
  const [song, setSong] = useState(null);
  const [similarSongs, setSimilarSongs] = useState([]);

  useEffect(() => {
    
      // Fetch song info
      axios.post(`http://localhost:8001/trackinfo_id/${trackId}`)
        .then(response => {
          console.log("Song Info:", response.data); // Add this line
          setSong(response.data.track_info[0]);
        })
        .catch(error => {
          console.error("Error fetching song details:", error);
        });
  
      // Fetch similar songs
      axios.post(`http://localhost:8001/getsimilartrack/${trackId}`, { top_n: 3 })
        .then(response => {
          console.log("Similar Songs:", response.data); // Add this line
          setSimilarSongs(response.data.similar_tracks);
        })
        .catch(error => {
          console.error("Error fetching similar tracks:", error);
        });
    
  }, [trackId]);
  

  const handlePlayPause = () => {
    window.open(song?.link, '_blank'); // Redirect to Spotify URL
  };

  return (
    <div className="song-page p-4">
      {/* Song Details */}
      <div className="song-details mb-6">
        {song ? (
          <>
            <h1 className="text-3xl font-bold mb-2">{song.track_name}</h1>
            <p className="text-lg text-gray-700">{song.artist}</p>
            <p className="text-md text-gray-500 mb-4">{song.genre}</p>
            <p className="text-md text-gray-500 mb-4">{song.year}</p> 
            <button
              onClick={handlePlayPause}
              className="py-2 px-4 rounded-lg text-white font-bold bg-green-500"
            >
              Play on Spotify
            </button>
          </>
        ) : (
          <p>Loading song details...</p>
        )}
      </div>
  
      {/* Similar Songs Section */}
      <div className="similar-songs mt-8">
        <h2 className="text-2xl font-bold mb-4">You Might Like</h2>
        {similarSongs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarSongs.map((similarSong) => (
              <div key={similarSong.track_id} className="similar-song bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{similarSong.track_name}</h3>
                <p className="text-gray-600">{similarSong.artist}</p>
                <Link to={`/song/${similarSong.track_id}`} className="text-blue-500 hover:underline">
                  Go to Song
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading similar songs...</p>
        )}
      </div>
    </div>
  );
  
};

export default Song;
